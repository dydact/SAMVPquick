import React from 'react';
import md5 from 'md5';

interface AvatarProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  fallback?: string;
}

interface GradientAvatarProps {
  name: string;
  email: string;
  size?: number;
}

const generateGradientColors = (hash: string) => {
  const colors = [];
  for (let i = 0; i < 3; i++) {
    const hue = parseInt(hash.substring(i * 2, i * 2 + 2), 16) % 360;
    const saturation = 70 + (parseInt(hash.substring(i * 2 + 6, i * 2 + 8), 16) % 30);
    const lightness = 45 + (parseInt(hash.substring(i * 2 + 12, i * 2 + 14), 16) % 10);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

const generateInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({ children, src, alt, fallback }) => {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white font-semibold">
          {fallback || children}
        </div>
      )}
    </div>
  );
};

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img className="w-full h-full object-cover" {...props} />;
};

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white font-semibold" {...props} />;
};

export const GradientAvatar: React.FC<GradientAvatarProps> = ({ name, email, size = 40 }) => {
  const hash = md5(name + email);
  const gradientColors = generateGradientColors(hash);
  const initials = generateInitials(name);

  return (
    <div
      className="flex items-center justify-center text-white font-bold rounded-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        width: size,
        height: size,
        fontSize: `${size / 2}px`,
      }}
    >
      {initials}
    </div>
  );
};

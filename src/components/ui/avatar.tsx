import md5 from 'md5';

interface AvatarProps {
  name: string;
  email: string;
  size?: number;
}

interface AvatarImageProps {
  src: string;
  alt: string;
  size?: number;
}

interface AvatarFallbackProps {
  children: React.ReactNode;
  size?: number;
}

const generateColor = (hash: string): string => {
  const hue = parseInt(hash.substring(0, 2), 16) % 360;
  const saturation = parseInt(hash.substring(2, 4), 16) % 100;
  const lightness = parseInt(hash.substring(4, 6), 16) % 100;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const generateInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ name, email, size = 40 }) => {
  const hash = md5(name + email);
  const backgroundColor = generateColor(hash);
  const initials = generateInitials(name);

  return (
    <div
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: size / 2,
        fontWeight: 'bold',
      }}
    >
      {initials}
    </div>
  );
};

const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, size = 40 }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
    }}
  />
);

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, size = 40 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ccc',
      color: 'white',
      fontSize: size / 2,
      fontWeight: 'bold',
    }}
  >
    {children}
  </div>
);

export { Avatar, AvatarImage, AvatarFallback };
import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 40 }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
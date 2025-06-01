import React from 'react';

interface BadgeProps {
  label: string;
  className?: string;
}

const KanjiBadge: React.FC<BadgeProps> = ({ label, className }) => {
  return (
    <span
      className={`text-white text-xs font-bold px-2 py-1 rounded-full shadow-md ${className}`}
    >
      {label}
    </span>
  );
};

export default KanjiBadge;

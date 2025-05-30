import React from 'react';
import type { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'div'> {
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  ...props
}: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

import React from 'react';
import type { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`py-3 px-6 bg-blue-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;

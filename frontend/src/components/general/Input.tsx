import React from 'react';
import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;

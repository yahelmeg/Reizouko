import React from 'react';

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="text-red-500 text-center font-medium py-4">{error}</div>
  );
};

export default Error;

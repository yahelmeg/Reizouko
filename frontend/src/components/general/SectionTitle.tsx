import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
}) => {
  return (
    <h1
      className={`text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;

import type { ReactNode } from 'react';
import React from 'react';

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }: AuthCardProps) => {
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
      {children}
    </div>
  );
};

export default AuthCard;

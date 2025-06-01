import type { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
      {children}
    </div>
  );
};

export default AuthCard;

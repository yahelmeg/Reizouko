import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default Loader;

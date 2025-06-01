import React from 'react';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg shadow-sm border border-gray-300">
      <span className="font-semibold text-blue-600">{currentPage + 1}</span> /{' '}
      <span className="font-semibold">{totalPages || 1}</span>
    </span>
  );
};

export default PageIndicator;

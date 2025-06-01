import React from 'react';
import Button from './Button.tsx';
import PageIndicator from './PageIndicator.tsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  loading = false,
}) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm">
      <Button
        onClick={onPrevious}
        disabled={loading || currentPage === 0}
        isLoading={false}
        className="w-auto px-3 py-1.5 text-white"
      >
        ← Previous
      </Button>

      <PageIndicator currentPage={currentPage} totalPages={totalPages} />

      <Button
        onClick={onNext}
        disabled={loading || currentPage >= (totalPages || 1) - 1}
        isLoading={false}
        className="w-auto px-3 py-1.5 text-white"
      >
        Next →
      </Button>
    </div>
  );
};

export default Pagination;

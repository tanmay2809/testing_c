import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center bg-white z-50 mt-4">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-[#004AAD]"></div>
    </div>
  );
};

export default Loader;

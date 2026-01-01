
import React from 'react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm p-6 text-center">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🎨
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-800">Drawing outlines...</h3>
      <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
        Our AI artist is carefully sketching the black outlines for you.
      </p>
      
      <div className="mt-8 space-y-2 w-full max-w-xs">
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 w-1/2 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

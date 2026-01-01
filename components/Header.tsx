
import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="px-6 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          C
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Colorify</h1>
      </div>
      <button 
        onClick={onReset}
        className="text-indigo-600 font-medium text-sm hover:underline"
      >
        Reset
      </button>
    </header>
  );
};

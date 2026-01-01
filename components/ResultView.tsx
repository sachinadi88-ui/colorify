
import React from 'react';

interface ResultViewProps {
  source: string;
  result: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ source, result, onReset }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = result;
    link.download = 'coloring-page.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Your Coloring Page!</h2>
        <p className="text-slate-500 text-sm">Pure outlines, ready for your creativity.</p>
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-2xl border border-slate-100">
        <img 
          src={result} 
          alt="Coloring Page Result" 
          className="w-full rounded-2xl border border-slate-200"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={downloadImage}
          className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all"
        >
          Save Image
        </button>
        <button
          onClick={onReset}
          className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
        >
          Try Another
        </button>
      </div>

      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
            💡
          </div>
          <div>
            <h4 className="text-sm font-bold text-indigo-900">Pro Tip</h4>
            <p className="text-xs text-indigo-700/80 leading-relaxed">
              Print this out and use crayons, or open it in a digital drawing app like Procreate to color it digitally!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

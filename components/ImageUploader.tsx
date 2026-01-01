
import React from 'react';

interface ImageUploaderProps {
  image: string | null;
  thickness: number;
  onThicknessChange: (val: number) => void;
  onImageSelected: (base64: string) => void;
  onConvert: () => void;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  image, 
  thickness, 
  onThicknessChange, 
  onImageSelected, 
  onConvert, 
  disabled 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const thicknessLabels: Record<number, string> = {
    1: 'Very Thin',
    2: 'Thin',
    3: 'Medium',
    4: 'Bold',
    5: 'Very Bold'
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Create a Masterpiece</h2>
        <p className="text-slate-500 text-sm">Upload any photo to turn it into a coloring page.</p>
      </div>

      <div className="relative group">
        {!image ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer overflow-hidden">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </div>
              <p className="mb-2 text-sm text-slate-700 font-semibold">Tap to upload photo</p>
              <p className="text-xs text-slate-500">PNG, JPG or WEBP</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img src={image} alt="Source" className="w-full h-full object-cover" />
            <label className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold shadow-sm cursor-pointer hover:bg-white transition-colors">
              Change Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        )}
      </div>

      {image && (
        <div className="space-y-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-700">Outline Thickness</label>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {thicknessLabels[thickness]}
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="5" 
            step="1" 
            value={thickness} 
            onChange={(e) => onThicknessChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 uppercase tracking-wider">
            <span>Delicate</span>
            <span>Standard</span>
            <span>Heavy</span>
          </div>
        </div>
      )}

      {image && (
        <button
          onClick={onConvert}
          disabled={disabled}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? 'Converting...' : 'Generate Coloring Page'}
        </button>
      )}

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🎨', text: 'Clean Lines' },
          { icon: '✨', text: 'AI Powered' },
          { icon: '🖍️', text: 'Ready to Print' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 bg-slate-50 rounded-2xl">
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

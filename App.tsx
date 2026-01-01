
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultView } from './components/ResultView';
import { LoadingOverlay } from './components/LoadingOverlay';
import { convertToColoringPage } from './services/geminiService';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [thickness, setThickness] = useState(3); // Default to Medium (3 on 1-5 scale)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setSourceImage(base64);
    setResultImage(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!sourceImage) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await convertToColoringPage(sourceImage, thickness);
      if (result) {
        setResultImage(result);
      } else {
        throw new Error("Model failed to generate an image.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to convert image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSourceImage(null);
    setResultImage(null);
    setThickness(3);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      <Header onReset={reset} />
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {!resultImage ? (
          <ImageUploader 
            image={sourceImage} 
            thickness={thickness}
            onThicknessChange={setThickness}
            onImageSelected={handleImageSelect} 
            onConvert={handleConvert}
            disabled={isLoading}
          />
        ) : (
          <ResultView 
            source={sourceImage!} 
            result={resultImage} 
            onReset={reset} 
          />
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 animate-pulse">
            {error}
          </div>
        )}
      </main>

      <footer className="p-4 text-center text-slate-400 text-xs border-t">
        Powered by Gemini 2.5 Flash AI
      </footer>

      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default App;

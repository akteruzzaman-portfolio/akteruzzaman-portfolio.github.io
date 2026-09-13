import { useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

export default function SplineBackground() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <>
      {/* Spline 3D Model Full Website Background */}
      <div
        id="spline-background-container"
        className={`fixed inset-0 w-full h-full overflow-hidden transition-all duration-500 ${
          isInteractive ? 'z-30 pointer-events-auto' : 'z-0 pointer-events-auto'
        }`}
      >
        <iframe
          id="spline-3d-iframe"
          src="https://community.spline.design/file/bfa41777-d0c8-4c0c-b692-088bf402254b"
          frameBorder="0"
          width="100%"
          height="100%"
          title="Spline 3D Scene"
          className="w-full h-full border-0 block"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />

        {/* Subtle dark tint gradient overlay to ensure perfect contrast and text legibility */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none transition-opacity duration-300 ${
            isInteractive ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Floating 3D Interaction Mode Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="toggle-spline-interactive-btn"
          onClick={() => setIsInteractive((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold backdrop-blur-xl border transition-all duration-300 shadow-xl cursor-pointer ${
            isInteractive
              ? 'bg-gradient-brand text-white border-[#7DBFFF]/60 shadow-[#923FFF]/40 scale-105'
              : 'bg-black/70 text-zinc-300 hover:text-white border-white/15 hover:border-[#923FFF]/50 hover:bg-black/90'
          }`}
          title={isInteractive ? 'Exit 3D Focus (Return to Website)' : 'Interact with 3D Scene Directly'}
          aria-label={isInteractive ? 'Exit 3D Focus' : 'Interact with 3D Scene'}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#7DBFFF]" />
          <span>{isInteractive ? 'Back to Portfolio' : 'Explore 3D Scene'}</span>
          {isInteractive ? (
            <EyeOff className="w-3.5 h-3.5 text-zinc-200" />
          ) : (
            <Eye className="w-3.5 h-3.5 text-zinc-300" />
          )}
        </button>
      </div>
    </>
  );
}

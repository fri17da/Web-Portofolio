import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 2. Check sessionStorage
    const alreadyShown = sessionStorage.getItem('portfolio_preloader_shown');

    if (prefersReducedMotion || alreadyShown) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    let progressVal = 10;
    setProgress(10);
    const startTime = performance.now();

    // Track real assets: Fonts and Hero profile image
    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const imagePromise = new Promise((resolve) => {
      const img = new Image();
      img.src = '/profile.jpeg';
      img.onload = () => resolve();
      img.onerror = () => resolve(); // continue even if network glitch
    });

    // Gradual increment timer
    const interval = setInterval(() => {
      progressVal = Math.min(progressVal + Math.floor(Math.random() * 15 + 8), 90);
      setProgress(progressVal);
    }, 120);

    Promise.all([fontPromise, imagePromise]).then(() => {
      clearInterval(interval);
      const elapsed = performance.now() - startTime;
      const minDuration = 1200; // at least 1.2s to prevent flash
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsRevealing(true);
          sessionStorage.setItem('portfolio_preloader_shown', 'true');
          setTimeout(() => {
            setShouldRender(false);
            onComplete?.();
          }, 600); // curtain reveal duration
        }, 200);
      }, remainingTime);
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('portfolio_preloader_shown', 'true');
    setIsRevealing(true);
    setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 300);
  };

  if (!shouldRender) return null;

  // Circular progress math (circumference = 2 * PI * r, r=42 -> ~263.89)
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09318D] text-white transition-transform duration-700 ease-in-out select-none ${
        isRevealing ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Pemuatan situs"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 dot-pattern-overlay opacity-25 pointer-events-none" />
      <div className="w-80 h-80 rounded-full bg-[#FD91CC]/15 blur-3xl absolute pointer-events-none animate-pulse-glow" />

      {/* Center Monogram with filling pink progress ring */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="5"
            />
            {/* Animated Pink Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#FD91CC"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-200 ease-out"
            />
          </svg>

          {/* Monogram "SA" in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-black text-3xl tracking-tight text-white">
              SA
            </span>
            <span className="font-mono text-xs font-bold text-[#FD91CC]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Status text line */}
        <p className="mt-6 text-xs sm:text-sm font-medium text-white/80 tracking-wide">
          Menyiapkan portfolio...
        </p>

        {/* Skip button */}
        <button
          type="button"
          onClick={handleSkip}
          className="mt-6 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-bold border border-white/20 transition-all focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
        >
          Lewati
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface AutoSliderProps {
  images: string[];
  interval?: number;
  className?: string;
  children?: React.ReactNode;
}

export function AutoSlider({ 
  images, 
  interval = 5000, 
  className = "",
  children 
}: AutoSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slider
  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('${images[currentSlide]}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      
      {/* Content overlay */}
      {children && (
        <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
          {children}
        </div>
      )}
      
      {/* Slider indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
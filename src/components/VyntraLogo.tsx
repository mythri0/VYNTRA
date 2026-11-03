import React from 'react';

interface VyntraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  lightMode?: boolean; // Default true for white header
}

export const VyntraLogo: React.FC<VyntraLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  lightMode = true
}) => {
  const iconDimensions = size === 'sm' ? 32 : size === 'lg' ? 44 : 36;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric V Monogram SVG Icon */}
      <div 
        className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ width: iconDimensions, height: iconDimensions }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="45%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="vRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="55%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="facetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          
          {/* Geometric Left Arm of V */}
          <path 
            d="M5 7 H13.5 L20 28.5 L14.5 28.5 Z" 
            fill="url(#vLeftGrad)" 
          />
          
          {/* Geometric Right Arm of V with Overlap */}
          <path 
            d="M35 7 H26.5 L17.5 28.5 L23 28.5 Z" 
            fill="url(#vRightGrad)" 
            opacity="0.95"
          />
          
          {/* Bottom Convergence Diamond: From Complexity to Clarity */}
          <polygon 
            points="20,28.5 14.5,28.5 17,34.5 23,34.5" 
            fill="url(#facetGrad)" 
          />

          {/* Precision Clarity Accent Node */}
          <circle cx="20" cy="13.5" r="2.2" fill="#60A5FA" />
        </svg>
      </div>

      {/* Wordmark and Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`font-['Outfit'] font-black tracking-tight text-xl sm:text-2xl ${
              lightMode ? 'text-[#0F172A]' : 'text-white'
            }`}
            style={{ letterSpacing: '-0.03em' }}
          >
            VYNTRA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mb-0.5" />
        </div>
        
        {showTagline && (
          <span 
            className={`text-[10px] font-medium tracking-wide mt-0.5 leading-none font-['Inter'] ${
              lightMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            From Complexity to Clarity
          </span>
        )}
      </div>
    </div>
  );
};

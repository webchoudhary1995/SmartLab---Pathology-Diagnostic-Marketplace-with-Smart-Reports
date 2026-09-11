'use client';

import { motion } from 'framer-motion';

interface SmartLabLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SmartLabLogo({ className = '', showTagline = true, size = 'md' }: SmartLabLogoProps) {
  const sizeClasses = {
    sm: { container: 'h-8', icon: 24, text: 'text-lg' },
    md: { container: 'h-12', icon: 32, text: 'text-2xl' },
    lg: { container: 'h-16', icon: 40, text: 'text-3xl' },
  };

  const { container, icon, text } = sizeClasses[size];

  return (
    <motion.div 
      className={`flex items-center gap-2 ${container} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <svg width={icon} height={icon} viewBox="0 0 40 40" className="drop-shadow-lg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
          {/* Cross/Plus symbol */}
          <path 
            d="M20 8 L20 32 M8 20 L32 20" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          {/* Small pulse circle */}
          <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 blur-xl bg-cyan-400/30 -z-10" />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold leading-tight ${text} gradient-text`}>
          SmartLab
        </span>
        {showTagline && (
          <span className="text-[10px] text-slate-500 -mt-0.5 hidden sm:block">
            Smart Diagnostic Intelligence
          </span>
        )}
      </div>
    </motion.div>
  );
}
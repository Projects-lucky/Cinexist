// This component renders a circular progress bar to visually represent a rating value.
// It includes animations for the progress bar and the displayed value, along with optional text for additional context.

// Props:
// - value: A number representing the rating value (default: 7). The value is expected to be between 0 and 10.
// - text: An optional string to display as a label or description below the progress bar.

// Why: This component is designed to provide a visually appealing and interactive way to display ratings,
// enhancing the user experience with smooth animations and gradient effects.

// Key Features:
// - Circular progress bar: Displays the rating as a circular progress indicator.
// - Animated value: Smoothly animates the progress bar and the displayed value when the rating changes.
// - Gradient effects: Uses a gradient stroke for the progress bar for a modern and vibrant appearance.
// - Hover effects: Reveals additional text when the user hovers over the component.
// - Responsive design: Adapts to various layouts and screen sizes.

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Ratingbar = ({ value = 7, text }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animation when value changes
  useEffect(() => {
    setAnimatedValue(0);
    const timeout = setTimeout(() => setAnimatedValue(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  // Calculate dasharray offset (circumference = 2πr, r=40 here)
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (animatedValue / 10) * circumference;

  return (
    <div className="flex relative w-auto h-auto group">
      {/* Circular progress bar */}
      <div className="relative w-12 h-12 flex items-center justify-center mb-4 shadow-sm shadow-c-d-grey rounded-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#ffffff"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            transform="rotate(-90 50 50)"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7b00ff" />
              <stop offset="100%" stopColor="#553bff" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center value display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-lg font-bold bg-gradient-to-r from-amber-300 to-red-500 bg-clip-text text-transparent backdrop-blur-sm rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {animatedValue}
          </motion.div>
        </div>
      </div>

      {/* Text below the progress bar */}
      <p className="text-md capitalize absolute top-1/2 -left-10 bg-c-black px-0.5 rounded-md hidden group-hover:flex">
        {text}
      </p>
    </div>
  );
};

export default Ratingbar;
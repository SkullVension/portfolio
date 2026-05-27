import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hidden md:block fixed right-5 lg:right-6 top-1/2 -translate-y-1/2 w-1 h-48 lg:h-64 bg-gray-warm-200 rounded-full z-50">
      <motion.div
        className="w-full bg-accent rounded-full absolute top-0 left-0"
        style={{
          height: `${scrollProgress * 100}%`,
        }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-accent rounded-full left-1/2 -translate-x-1/2 shadow-lg"
        style={{
          top: `${scrollProgress * 100}%`,
          transform: `translate(-50%, -${scrollProgress * 100}%)`,
        }}
      />
    </div>
  );
};

export default ScrollProgress;

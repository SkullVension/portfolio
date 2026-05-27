import { useState, useRef, useCallback, useEffect } from 'react';

interface MagnetConfig {
  strength?: number;
  radius?: number;
}

export const useMagnet = (config: MagnetConfig = {}) => {
  const { strength = 0.3, radius = 150 } = config;
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const factor = (1 - distance / radius) * strength;
        setPosition({
          x: distanceX * factor,
          y: distanceY * factor,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, x: position.x, y: position.y };
};

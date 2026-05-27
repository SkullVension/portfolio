import { useState, useEffect, useRef, useCallback } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export const useScramble = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  const scramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    iterationRef.current = 0;

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iterationRef.current > index) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }

      iterationRef.current += 1 / 3;
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    scramble();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [scramble]);

  return displayText;
};

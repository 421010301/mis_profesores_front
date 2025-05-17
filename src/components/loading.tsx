// components/LoadingComponent.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';

// components/LoadingComponent.tsx (fragmento)
const icons = [
  'mortarboard-fill',  // profesor
  'person-fill',       // alumno
  'book-fill',         // alumno
  'cpu',               // IA
  'stars',             // chispas
  'robot'              // IA
];

export default function Loading() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent(prev => (prev + 1) % icons.length);
    }, 1000); // cambia cada segundo
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-container">
      <AnimatePresence mode="wait">
        <motion.i
          key={current}
          className={`bi bi-${icons[current]} loading-icon fs-1 gradient-text`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      <style jsx>{`
        .loading-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 5rem;
          overflow: hidden;
        }
        .loading-icon {
          position: absolute;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}

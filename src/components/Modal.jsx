import React, { useEffect } from 'react';
import css from './App.module.css';

export function Modal({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modalBackdrop} onClick={handleOverlayClick}>
      <div className={css.modalContent}>
        <img src={src} alt={alt} className={css.modalImage} />
      </div>
    </div>
  );
}

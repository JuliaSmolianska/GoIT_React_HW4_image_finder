import React from 'react';
import css from './App.module.css';

export const Modal = ({ src, alt, onClose }) => {
  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent}>
        <img src={src} alt={alt} className={css.modalImage} />
      </div>
    </div>
  );
};

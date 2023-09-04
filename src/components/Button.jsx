import React from 'react';
import css from './App.module.css';

export const Button = ({ addLoadMore }) => (
  <button type="button" className={css.Button} onClick={addLoadMore}>
    Load more
  </button>
);

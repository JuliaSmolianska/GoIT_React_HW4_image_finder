import React from 'react';
import { Bars } from 'react-loader-spinner';
import css from './App.module.css';

export const Loader = () => (
  <div className={css.loader}>
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

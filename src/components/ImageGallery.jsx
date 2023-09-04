import css from './App.module.css';

export const ImageGallery = ({ children }) => {
  return <ul className={css.ImageGallery}>{children}</ul>;
};

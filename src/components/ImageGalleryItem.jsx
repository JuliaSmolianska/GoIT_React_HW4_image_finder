import css from './App.module.css';

export const ImageGalleryItem = ({ src, alt, onClick }) => (
  <li className={css.gallery_item}>
    <img src={src} alt={alt} onClick={onClick} />
  </li>
);

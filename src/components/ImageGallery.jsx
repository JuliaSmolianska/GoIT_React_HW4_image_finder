import css from './App.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';

export const ImageGallery = ({
  images,
  showModal,
  modalImage,
  openModal,
  closeModal,
}) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => openModal(image.largeImageURL)}
          className={css.ImageGalleryItem}
        />
      ))}
      {showModal && (
        <Modal src={modalImage} alt={modalImage.tags} onClose={closeModal} />
      )}
    </ul>
  );
};

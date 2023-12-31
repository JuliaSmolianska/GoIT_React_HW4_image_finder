import React, { useState, useEffect, useRef } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { fetchImagesByQuery } from '../FetchImage';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [buttonClick, setButtonClick] = useState(0);
  const [isRequestCancelled, setIsRequestCancelled] = useState(false);

  const controller = useRef();

  useEffect(() => {
    if (query !== '' || page !== 1) {
      const fetchImages = async () => {
        //* Якщо є попередній запит -> відмінити
        setIsRequestCancelled(false);

        if (controller.current) {
          controller.current.abort();
        }

        //*Створити новий контроллер
        controller.current = new AbortController();

        try {
          setIsLoading(true);
          setError(false);
          const { hits, totalHits } = await fetchImagesByQuery(
            query,
            page,
            controller
          );

          if (!hits.length) {
            toast.error(
              'No images found matching your search query, please change your request and try again',
              { duration: 5000 }
            );
            return;
          }
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalHits(totalHits);
        } catch (error) {
          if (error.code !== 'ERR_CANCELED') {
            setError(true);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchImages();
    }
  }, [query, page, buttonClick]);

  const handleSearchSubmit = evt => {
    evt.preventDefault();
    const queryValue = evt.target.elements.query.value.trim();
    if (queryValue !== '') {
      setQuery(queryValue);
      setImages([]);
      setPage(1);
      setButtonClick(prevButtonClick => prevButtonClick + 1);
    } else {
      toast('Please enter your query', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setShowModal(true);
    setModalImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const lastPage = Math.ceil(totalHits / images.length);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      {error &&
        !isLoading &&
        toast.error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          showModal={showModal}
          modalImage={modalImage}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {images.length > 0 && !isLoading && lastPage > 1 && (
        <Button addLoadMore={handleLoadMore} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

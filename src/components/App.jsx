import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Button } from './Button';
import { fetchImagesByQuery } from './FetchImage';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: false,
    showModal: false,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true, error: false });
      const queryParts = this.state.query.split('/');
      const searchQuery = queryParts[1];
      const { hits, totalHits } = await fetchImagesByQuery(
        searchQuery,
        this.state.page
      );

      if (!hits.length) {
        toast.error(
          'No images found matching your search query, please change your request and try again',
          {
            duration: 5000,
          }
        );

        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = evt => {
    evt.preventDefault();
    const queryValue = evt.target.elements.query.value.trim();
    const query = `${Date.now()}/${queryValue}`;
    this.setState({
      query: query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = image => {
    console.log('openModal called with image:', image);
    this.setState({ showModal: true, modalImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, isLoading, error, totalHits, showModal, modalImage } =
      this.state;
    const lastPage = Math.ceil(totalHits / images.length);

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader />}
        {error &&
          !isLoading &&
          toast.error('Something went wrong, please try reloading the page', {
            duration: 5000,
          })}
        {images.length > 0 && (
          <ImageGallery>
       
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => this.openModal(image.largeImageURL)}
                className={css.ImageGalleryItem}
              />
            ))}
            {showModal && (
              <Modal
                src={modalImage}
                alt={modalImage.tags}
                onClose={this.closeModal}
              />
            )}
          </ImageGallery>
        )}
        {images.length > 0 && !isLoading && lastPage > 1 && (
          <Button addLoadMore={this.handleLoadMore} />
        )}
        <Toaster position="top-right" />
      </div>
    );
  }
}

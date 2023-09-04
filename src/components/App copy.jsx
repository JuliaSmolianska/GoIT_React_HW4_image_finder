import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Button } from './Button';
import axios from 'axios';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    clickButton: 0,
    showModal: false,
    modalImage: '',
  };

  componentDidMount() {
    // URL, на який ви хочете відправити GET-запит
    const apiUrl = 'https://pixabay.com/';

    // Відправити GET-запит
    axios
      .get(apiUrl)
      .then(response => {
        // Обробити відповідь
        console.log('Відповідь від сервера:', response);
      })
      .catch(error => {
        // Обробити помилку
        console.error('Помилка:', error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.clickButton !== this.state.clickButton ||
      prevState.page !== this.state.page
    ) {
      //API FETCH
      this.fetchImages();
    }
  }

  handleSearchSubmit = query => {
    const { page } = this.state;
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
    axios
      .get(apiUrl)
      .then(response => {
        // Опрацюйте відповідь API та оновіть стан вашого компонента з отриманими даними
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        console.error('Помилка запиту до API:', error);
      });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: evt.target.elements.query.value,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleClickButton = () => {
    this.setState(prevState => ({
      clickButton: prevState.clickButton + 1,
    }));
  };

  // code
  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;

    if (!query) return;

    this.setState({ isLoading: true });

    axios
      .get(BASE_URL, {
        params: {
          q: query,
          page,
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: PER_PAGE,
        },
      })
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
  // end code

  openModal = image => {
    this.setState({ showModal: true, modalImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, isLoading, showModal, modalImage } = this.state;
    return (
      <div>
        <Searchbar
          onSubmit={this.handleSubmit}
          clickButton={this.handleClickButton}
        />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.openModal(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button addLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            src={modalImage.largeImageURL}
            alt={modalImage.tags}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

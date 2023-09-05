import React, { Component } from 'react';
import css from './App.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.modalBackdrop} onClick={this.handleOverlayClick}>
        <div className={css.modalContent}>
          <img src={src} alt={alt} className={css.modalImage} />
        </div>
      </div>
    );
  }
}

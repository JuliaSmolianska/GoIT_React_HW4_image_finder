import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export class MyModal extends Component {
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
    const { src, alt, showModal } = this.props;
    return (
      <Modal
        isOpen={showModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
      >
        <div className="overlay" onClick={this.handleOverlayClick}>
          <div className="modal">
            <img src={src} alt={alt} />
          </div>
        </div>
      </Modal>
    );
  }
}

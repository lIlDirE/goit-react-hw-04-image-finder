/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({closeModal, url, alt}) => {
  useEffect(() => {
    window.addEventListener('keydown', closeEscModal);
    return () => {
      window.removeEventListener('keydown', closeEscModal);
    };
  // eslint-disable-next-line no-use-before-define
  }, []);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const closeEscModal = e => {
    if (e.key === 'Escape') {
      closeModal()
    }
  };

  return (

    <div className={css.modal} onClick={handleBackDropClick}>
      <div className={css.content}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

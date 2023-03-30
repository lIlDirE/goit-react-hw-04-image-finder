import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

const ImageGallery = ({ dataImages, toggleLoader, loadHits, onLoadMore }) => {
  const [isActive, setIsActive] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

  const toggleModal = e => {
    setLargeImageUrl(e.largeImageURL);
    setLargeImageAlt(e.tags);
    setIsActive(true);
  };

  const closeModal = () => {
    setIsActive(false);
  };

  const LoadMore = () => {
    onLoadMore();
  };

  return (
    <>
      {dataImages[0] && (
        <ul className={css.galleryList}>
          <ImageGalleryItem images={dataImages} toggleModal={toggleModal} />
        </ul>
      )}
      {toggleLoader && <Loader />}
      {loadHits === 12 && (
        <Button onLoadMore={LoadMore} toggleLoader={toggleLoader} />
      )}
      {isActive && (
        <Modal
          url={largeImageUrl}
          alt={largeImageAlt}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.prototypes = {
	dataImages: PropTypes.array.isRequired,
	toggleLoader: PropTypes.bool.isRequired,
	loadHits: PropTypes.number.isRequired,
	onLoadMore: PropTypes.func.isRequired
}
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';


const ImageGalleryItem = ({images, toggleModal}) => {
  const handleModal = e => {
    const eBigImage = images.find(image => {
      return image.webformatURL === e.target.src;
    });
    toggleModal(eBigImage);
  };

  return images.map(image => {
    return (
      <li key={image.id}>
        <img
          className={css.imgli}
          src={image.webformatURL}
          alt={image.tags}
          onClick={handleModal}
        />
      </li>
    );
  });
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
	images: PropTypes.array.isRequired,
	toggleModal: PropTypes.func.isRequired,
  };

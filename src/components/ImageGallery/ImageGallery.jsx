import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.scss';

const ImageGallery = ({ images, onImageClick }) => {
  const imageGalleryItems = useMemo(() => {
    return images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onImageClick={onImageClick}
      />
    ));
  }, [images, onImageClick]);

  return <ul className={styles.ImageGallery}>{imageGalleryItems}</ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;

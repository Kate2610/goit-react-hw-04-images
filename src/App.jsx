import React, { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as CloseIcon } from './images/close.svg';
import fetchImages from './api/api-services';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      getImages();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage !== 1) {
      scrollOnLoadButton();
    }
  }, [images, currentPage]);

  const onChangeQuery = (query) => {
    setImages([]);
    setCurrentPage(1);
    setSearchQuery(query);
    setIsLoading(false);
    setShowModal(false);
    setLargeImage('');
    setError(null);
  };

  const getImages = async () => {
    setIsLoading(true);

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      setImages((prevImages) => [...prevImages, ...hits]);
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGalleryItem = (fullImageUrl) => {
    setLargeImage(fullImageUrl);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const needToShowLoadMore = () => {
    return images.length > 0 && images.length >= 12;
  };

  return (
    <>
      <Searchbar onSearch={onChangeQuery} />
      <ImageGallery images={images} onImageClick={handleGalleryItem} />

      {needToShowLoadMore() && <Button onClick={getImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div className="Close-box">
            <IconButton onClick={toggleModal} aria-label="Close modal">
              <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
            </IconButton>
          </div>
          <img src={largeImage} alt="" className="Modal-image" />
        </Modal>
      )}

      {isLoading && <Loader />}

      {error}
    </>
  );
}

export default App;

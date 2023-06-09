import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  const handleBackdropClick = useCallback(
    event => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

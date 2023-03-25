import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './IconButton.module.scss';

const IconButton = ({ children, onClick, ...allyProps }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <button
      type="button"
      className={styles.IconButton}
      onClick={handleClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  onClick: null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;

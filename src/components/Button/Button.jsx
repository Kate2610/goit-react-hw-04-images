import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    onClick().finally(() => setIsLoading(false));
  }, [onClick]);

  return (
    <div className={styles['Button-wrapper']}>
      <button type="button" className={styles.Button} onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;


import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ onNext, onPrevious }) => {
  return (
    <>
      <div className='pagination'>
        <button type='button' onClick={onPrevious}>
          Previous
        </button>
        <span>|</span>
        <button type='button' onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
};

Pagination.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default Pagination;

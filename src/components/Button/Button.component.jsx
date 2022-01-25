import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button className={className} onClick={onClick} type='button'>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;

import React from 'react';
import { PropTypes } from 'prop-types';

const Circle = () => (
  <div className="sk-circle">
    <div className="sk-circle1 sk-child" />
    <div className="sk-circle2 sk-child" />
    <div className="sk-circle3 sk-child" />
    <div className="sk-circle4 sk-child" />
    <div className="sk-circle5 sk-child" />
    <div className="sk-circle6 sk-child" />
    <div className="sk-circle7 sk-child" />
    <div className="sk-circle8 sk-child" />
    <div className="sk-circle9 sk-child" />
    <div className="sk-circle10 sk-child" />
    <div className="sk-circle11 sk-child" />
    <div className="sk-circle12 sk-child" />
  </div>
);

const Spinner = ({ children, message }) => (
  <div className="mi-spinner">
    { children }
    <div style={ { color: '#666', textAlign: 'center' } }>{ message }</div>
  </div>
);
Spinner.propTypes = {
  children: PropTypes.object,
  message: PropTypes.string
};
Spinner.defaultProps = {
  message: 'Loading...'
};

const CircleSpinner = () => <Spinner><Circle /></Spinner>;
export default CircleSpinner;

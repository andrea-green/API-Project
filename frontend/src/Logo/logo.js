import React from 'react';
import logo from './logo.png';
import './Logo.css';

function Logo() {
  // Import result is the URL of your image.
  return (
    <div  className='logo'>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;

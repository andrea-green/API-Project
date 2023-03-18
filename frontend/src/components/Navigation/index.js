import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='logo-and-profile-button-div'>
      <li>
        <NavLink exact to="/">
          <img className='logo' src={require('../../snowBee-logo.png')} alt='snow-bee-logo'></img>
        </NavLink>
      </li>
      {isLoaded && (
        <li className='profile-button'>
          <ProfileButton user={sessionUser} />
          < SearchBar /> 
        </li>
      )}
    </ul>
  );
}

export default Navigation;

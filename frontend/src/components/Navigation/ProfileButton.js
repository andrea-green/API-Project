import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUser from "../DemoUser";
import CreateSpotForm from "../CreateSpotFormModal/CreateSpotForm";
import UserReviewsModal from "../Review/user-reviews";
import UserBookings from "../Bookings/user-bookings";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useSelector((state) => state.session.user);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const ulStyle = {
    position: 'absolute',
    top: '100%',
    left: '-3rem',
    width: 'fit-content',
    height: 'fit-content', // Set a fixed height for the ul element
    padding: '10px',
    background: 'white',
    border: '1px solid black',
    borderRadius: '10px',
    zIndex: '1'
  };


  return (
    <div className='dropdown-menu-div'>
      <button className='button' onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>

      <ul className={ulClassName} ref={ulRef} style={ulStyle}>
        {user ? (
          <div >
            <div className='user-info-div' style={{listStyleType:'none'}}>
              {/* <li className='form-input'>{user.username}</li> */}
              <li className='form-input'>{user.firstName} {user.lastName}</li>
              {/* <li className='form-input'>{user.email}</li> */}
            </div>
            <div className='button form-input'>

              <OpenModalMenuItem

                itemText="List Your Property"
                onItemClick={closeMenu}
                modalComponent={<CreateSpotForm />}
              />
            </div>
            <div className="button form-input">
              <OpenModalMenuItem
                itemText="My Reviews"
                onItemClick={closeMenu}
                modalComponent={<UserReviewsModal />}
              />
            </div>
            <div className="button form-input">
              <OpenModalMenuItem
                itemText="My Bookings"
                onItemClick={closeMenu}
                modalComponent={<UserBookings />}
              />
            </div>
            <li style={{listStyleType:'none'}}>
              <button className='button form-button' onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              className='modal'
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <DemoUser />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUser from "../DemoUser";
import CreateSpotForm from "../CreateSpotFormModal/CreateSpotForm";
import UserReviewsModal from "../Review/user-reviews";

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

  return (
    <div className='dropdown-menu-div'>
      <button className='button' onClick={openMenu}>
        <i class="fa-solid fa-user"></i>
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className='user-info-div'>
              <li className='form-input'>{user.username}</li>
              <li className='form-input'>{user.firstName} {user.lastName}</li>
              <li className='form-input'>{user.email}</li>
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
            <li>
              <button className='button form-button' onClick={logout}>Log Out</button>
            </li>
          </>
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

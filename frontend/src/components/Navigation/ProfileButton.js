import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUser from "../DemoUser";
import CreateSpotForm from "../CreateSpotFormModal/CreateSpotForm";
import UserReviewsModal from "../Review/user-reviews";
import { getUserReviewsThunk } from "../../store/reviews.js"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
    const closeMenu = () => setShowMenu(false);
  };

  const userReviews = (e) => {
    e.preventDefault();
    dispatch(getUserReviewsThunk())
    closeMenu();
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <OpenModalMenuItem
              itemText="List Your Property"
              onItemClick={closeMenu}
              modalComponent={<CreateSpotForm />}
            />
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
            <OpenModalMenuItem
              itemText="My Reviews"
              onItemClick={closeMenu}
              modalComponent={<UserReviewsModal />}
            />
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Demo User"
              onItemClick={closeMenu}
              modalComponent={<DemoUser />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

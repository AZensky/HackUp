import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user, classStyle }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    // click event listener to close the dropdown menu whenever a user clicks on anything but the menu
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="profile-button-container" onClick={openMenu}>
        <button className={classStyle}>{user.firstName[0]}</button>
        {showMenu === false ? (
          <i class="fa-solid fa-caret-down"></i>
        ) : (
          <i class="fa-solid fa-caret-up"></i>
        )}
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <Link to="/profile" className="profile-button-your-profile">
            Your Profile
          </Link>
          <li onClick={logout}>
            {/* <button onClick={logout}>Log Out</button> */}
            Log Out
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

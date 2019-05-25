import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Header.css";
import Modal from "../Modal/Modal";
import FloatMenu from "../UI/FloatMenu/FloatMenu";
import logo from "../../assets/donko-logo.png";
import searchIcon from "../../assets/search.svg";
// import notificationIcon from "./notification.svg";

const Header = props => {
  const [searchInput, setSearchInput] = useState("");
  const [showFloatMenu, setShowFloatMenu] = useState(false);
  const [showModalSignOut, setShowModalSignOut] = useState(false);

  // TODO: Handle Log Out
  const handleLogOut = () => {};

  useEffect(() => {
    return () => {
      // TODO: Search TODOS, CARDS and BOARDS
    };
  });

  let modal;

  if (showModalSignOut) {
    modal = createPortal(
      <Modal title="Sign Out" callbackCloseModal={() => setShowModalSignOut(false)}>
        <div className="flex justify-center">
          <button
            className="ba br1 mt3 pointer pv2 lh-copy ph3 bg-orange b--black-025 dim white"
            onClick={handleLogOut}
          >
            I really want to logout.
          </button>
        </div>
      </Modal>,
      document.body
    );
  }

  return (
    <header className="header relative flex items-center nowrap">
      <div className="logoDiv w3-5">
        <img src={logo} alt="Logo Donko - A Simple kanban To Do" className="logo" />
      </div>
      <div className="spacerHeader" />
      <div className="searchDiv items-center inline-flex w-100">
        <img src={searchIcon} alt="Search Icon" className="searchIcon absolute" />
        <input
          type="search"
          name="search"
          id="search"
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
          className="searchInput f5 lh-solid w-100 items-center"
          placeholder="Where did I put that thing?"
        />
      </div>
      {/* TODO: Add Notifications */}
      {/* <a href="#" className="link mr3">
        <img src={notificationIcon} alt="Notification Icon" className="notificationIcon" />
      </a> */}
      <div className="spacerHeader" />
      <button
        className="ml2 pl3 pr0 dark-gray fw5 dim flex userMenu items-center mid-gray"
        onClick={() => setShowFloatMenu(prevState => !prevState)}
      >
        <img
          src={props.user.image}
          alt={`Profile perfil ${props.user.name}`}
          className="br-100 mw4 mr2 dib profileImageIcon"
        />
        {props.user.name}
      </button>

      {showFloatMenu ? (
        <FloatMenu
          customStyle={{ top: "94%" }}
          buttons={[
            {
              onClickFunction: () => {},
              icon: "user-cog",
              text: "Account Settings"
            },
            {
              onClickFunction: () => setShowModalSignOut(true),
              icon: "sign-out-alt",
              text: "Sign Out"
            }
          ]}
          deleteMe={() => setShowFloatMenu(false)}
        />
      ) : null}
      {modal}
    </header>
  );
};

export default Header;

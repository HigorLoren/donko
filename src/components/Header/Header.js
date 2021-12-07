import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Auth from '../../auth';
import Modal from '../Modal/Modal';
import FloatMenu from '../UI/FloatMenu/FloatMenu';
import logo from '../../assets/donko-logo.png';
import SearchBar from '../SearchBar/SearchBar';
// import notificationIcon from "./notification.svg";
import classes from './Header.module.css';

const Header = (props) => {
  const [showFloatMenu, setShowFloatMenu] = useState(false);
  const [showModalSignOut, setShowModalSignOut] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Auth.deauthenticateUser();
    navigate('/login');
  };

  useEffect(() => {
    return () => {
      // TODO: Search TODOS, CARDS and BOARDS
    };
  });

  return (
    <header className={`${classes.Header} relative flex items-center nowrap`}>
      <div className={`${classes.LogoDiv}`}>
        <img src={logo} alt="Logo Donko - A Simple kanban To Do" className={classes.Logo} />
      </div>
      <div className={`${classes.FirstSpacerHeader} ${classes.SpacerHeader}`} />
      <SearchBar customStyle="mh3 w-100" boardsToSearch={props.dataToSearch} />
      {/* TODO: Add Notifications */}
      {/* <a href="#" className="link mr3">
        <img src={notificationIcon} alt="Notification Icon" className="notificationIcon" />
      </a> */}
      <div className={classes.SpacerHeader} />
      <button
        className={`${classes.UserMenu} ml2 pl3 pr0 dark-gray fw5 dim pointer flex items-center mid-gray`}
        onClick={() => setShowFloatMenu((prevState) => !prevState)}
        type="button"
      >
        <img
          src={props.currentUser.image}
          alt={`Profile perfil ${props.currentUser.name}`}
          className={`${classes.ProfileImageIcon} br-100 mw4 mr2 dib`}
        />
        {props.currentUser.name}
      </button>

      {showFloatMenu ? (
        <FloatMenu
          customStyle={{ top: '94%' }}
          buttons={[
            {
              onClickFunction: () => {},
              icon: 'user-cog',
              text: 'Account Settings',
            },
            {
              onClickFunction: () => setShowModalSignOut(true),
              icon: 'sign-out-alt',
              text: 'Sign Out',
            },
          ]}
          deleteMe={() => setShowFloatMenu(false)}
        />
      ) : null}

      {showModalSignOut ? (
        <Modal title="Sign Out" callbackCloseModal={() => setShowModalSignOut(false)}>
          <div className="flex justify-center">
            <button
              className="ba br1 btn-visible-focus mt3 pointer pv2 lh-copy ph3 bg-orange b--black-025 dim white"
              onClick={handleLogOut}
              autoFocus
              type="button"
            >
              I really want to logout.
            </button>
          </div>
        </Modal>
      ) : null}
    </header>
  );
};

Header.propTypes = {
  dataToSearch: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);

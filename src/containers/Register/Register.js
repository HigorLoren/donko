import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm/useForm';
import Auth from '../../auth';
import classes from './Register.module.css';

const SignUp = (props) => {
  const [alertBox, setAlertBox] = useState({ type: undefined, error: ' ' });
  const navigate = useNavigate();

  if (Auth.isUserAuthenticated()) {
    navigate('/');
  }

  const setAlertBoxTimeout = (value, timeToDisplay) => {
    setAlertBox(value);

    // Cleaning the messages
    setTimeout(() => {
      // First hide with changing the type
      setAlertBox((old) => ({ type: undefined, error: old.error }));
      // Second wait until disappear and clear the error text
      setTimeout(() => setAlertBox({ type: undefined, error: '' }), 1010);
    }, timeToDisplay);
  };

  const validateForm = (userDataForm) => {
    if (userDataForm.password !== userDataForm.passwordToConfirm) {
      setAlertBoxTimeout(
        { type: classes.AlertBoxDanger, error: 'The passwords must match.' },
        5000
      );
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDataForm.email)) {
      setAlertBoxTimeout(
        { type: classes.AlertBoxDanger, error: 'Must be a valid email address.' },
        5000
      );
      return false;
    }

    return true;
  };

  const login = (userDataForm) => {
    const isFormValid = validateForm(userDataForm);

    if (isFormValid) if (Auth.authenticateUser(Auth.createUser(userDataForm))) navigate('/');
  };

  const { handleChange, handleSubmit } = useForm(login);

  return createPortal(
    <div className="measure center shadow-5 bg-white br3 pa4 mv3">
      <form className="" method="POST">
        <fieldset id="register" className="ba b--transparent ph0 mh0">
          <legend className="f2 mb1 fw7 mid-gray ph0 mh0 tc">Register</legend>
          <div className={`mt2 mh3 br2 fw4 f5 white pv2 ph3 ${classes.AlertBox} ${alertBox.type}`}>
            {alertBox.error}
          </div>
          <div className="mt3">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100 lh-copy"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              id="username"
              required
            />
          </div>
          <div className="mv3">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100 lh-copy"
              type="email"
              name="emailAddress"
              placeholder="Email"
              onChange={handleChange}
              id="email-address"
              required
            />
          </div>
          <div className="mv3">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100 lh-copy"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              id="password"
              required
            />
            <input
              className="pv2 mt1 ph3 input-reset bw0 bg-black-05 br2 w-100 lh-copy"
              type="password"
              name="passwordToConfirm"
              placeholder="Confirm the Password"
              onChange={handleChange}
              id="passwordToConfirm"
              required
            />
          </div>
        </fieldset>
        <div className="">
          <button
            className="ph3 fw5 b--moon-gray br2 w-100 mid-gray pv2 input-reset ba bg-transparent hover-bg-light-gray bg-animate pointer f5 dib"
            type="button"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </div>
        <div className="lh-copy mt4 flex">
          <div className="w-50">
            <Link to="/login" className="f6 dim mid-gray">
              Already have an account?
            </Link>
          </div>
          <div className="w-50 tr">
            <Link to="/forgot-password" className="f6 dim mid-gray">
              Forgot your password?
            </Link>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default SignUp;

import React from "react";
import { createPortal } from "react-dom";
import { withRouter } from "react-router-dom";
import useForm from "../../hooks/useForm/useForm";

const SignIn = props => {
  const login = user => {
    // BACKENDPLACEHOLDER:
    // Look for the email and password in DB and retrive a token
    console.log(JSON.stringify(user));
    const token = "123";
    // --END--
    localStorage.setItem("token", token);
    props.history.push("/");
  };

  const { handleChange, handleSubmit } = useForm(login);

  return createPortal(
    <div className="measure center shadow-5 bg-white br3 pa4 mv3">
      <form className="" method="POST" onSubmit={handleSubmit}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw7 mid-gray ph0 mh0 tc">Create Account</legend>
          <div className="mt4">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100"
              type="email"
              name="email-address"
              placeholder="Email"
              onChange={handleChange}
              id="email-address"
              required
            />
          </div>
          <div className="mv3">
            <input
              className="pv2 ph3 input-reset bw0 bg-black-05 br2 w-100"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              id="password"
              required
            />
          </div>
          <label className="pa0 ma0 lh-copy f6 pointer">
            <input type="checkbox" /> Remember me
          </label>
        </fieldset>
        <div className="">
          <input
            className="ph3 fw5 b--moon-gray br2 w-100 mid-gray pv2 input-reset ba bg-transparent hover-bg-light-gray bg-animate pointer f5 dib"
            type="submit"
            onChange={handleChange}
            value="Sign in"
          />
        </div>
        <div className="lh-copy mt4 flex">
          <div className="w-50">
            <a href="#0" className="f6 dim mid-gray">
              Sign In
            </a>
          </div>
          <div className="w-50 tr">
            <a href="#0" className="f6 dim mid-gray">
              Forgot your password?
            </a>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default withRouter(SignIn);
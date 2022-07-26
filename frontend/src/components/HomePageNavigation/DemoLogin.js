import React from "react";
import "./DemoLogin.css";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function DemoLoginButton() {
  const dispatch = useDispatch();
  function handleClick() {
    return dispatch(
      sessionActions.login({ email: "demo@user.io", password: "password" })
    );
  }
  return (
    <button className="demo-login-button" onClick={handleClick}>
      Demo Login
    </button>
  );
}

export default DemoLoginButton;

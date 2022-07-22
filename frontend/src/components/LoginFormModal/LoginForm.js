import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
// import meetup-login.svg from '../../assets/images.meetup-login.svg'

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    //if there are errors when trying to log in, set the errors, so we can display them
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.message) setErrors([data.message]);
      }
    );
  };

  //form with controlled components
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <h1 className="login-form__title">Log in</h1>
      <div className="login-form__subtitle">
        <span>Not a member yet?</span>
        <Link to="/signup" className="login-form__subtitle__sign-up">
          Sign up
        </Link>
      </div>
      <label className="login-form__email__label">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="login-form__password__label">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="login-form__log-in">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;

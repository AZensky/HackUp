import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import FooterColumn from "./FooterColumn";
import LoginFormModal from "../LoginFormModal";

function Footer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <div className="footer-container">
      {/* Footer header */}
      <div className="footer-header-container">
        <div className="footer-header">
          <p>Get started on Meetup.</p>
          <Link to="/signup" className="footer-signup">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="footer-columns-container">
        <div className="your-account-column">
          <h4>Your Account</h4>
          <Link to="/signup" className="signup-login-footer-link">
            Sign up
          </Link>
          {!sessionUser && <LoginFormModal styleClass="footer-login" />}
          {sessionUser && (
            <div className="footer-log-out" onClick={logout}>
              Log Out
            </div>
          )}
        </div>
        <FooterColumn
          title={"Discover"}
          categories={[
            { name: "Groups", link: "groups" },
            { name: "Events", link: "events" },
          ]}
        />
        <div className="technologies-column">
          <h4>Technologies Used</h4>
          <p>Express</p>
          <p>Sequelize</p>
          <p>React</p>
          <p>Redux</p>
        </div>
      </div>

      {/* Footer Social Links */}
      <div className="footer-socials-container">
        <h4>Connect with Me!</h4>
        <div className="footer-social-links">
          <a href="https://www.linkedin.com/in/alex-zelinsky/">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://medium.com/@alexzelinsky124">
            <i class="fa-brands fa-medium"></i>
          </a>
          <a href="https://www.instagram.com/a.zelinsky7/?hl=en">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

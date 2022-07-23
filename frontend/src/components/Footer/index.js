import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import FooterColumn from "./FooterColumn";
import LoginFormModal from "../LoginFormModal";

function Footer() {
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
          <LoginFormModal styleClass="footer-login" />
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
    </div>
  );
}

export default Footer;

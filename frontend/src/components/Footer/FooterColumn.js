import React from "react";
import { Link } from "react-router-dom";
import "./FooterColumn.css";

function FooterColumn({ title, categories }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      {categories.map((category) => (
        <Link
          to={`/${category.link}`}
          key={category.name}
          className="category-link footer-hover"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default FooterColumn;

import React from "react";
import { Link } from "react-router-dom";

import "../styles/CategoryItem.css";

const CategoryItem = ({ category }) => {
  return (
    <div className="category-card">
      <Link to={"/category" + category.href} className="category-link">
        <div className="gradient-overlay" />
        <img
          src={category.imgUrl}
          alt={category.name}
          className="category-img"
          loading="lazy"
        />

        <div className="category-info">
          <h3 className="category-name">{category.name}</h3>
          <p className="category-tagline">Explore {category.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;

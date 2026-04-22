import React from "react";
import "../styles/Home.css";
import { categories } from "../stores/useProductStore.js";
import CategoryItem from "../components/CategoryItem.jsx";

const HomePage = () => {
  return (
    <>
      <div className="home-layout-root">
        <div className="content-layer">
          <h1 className="hero-headline">Explore our Categories</h1>
          <p className="hero-description">Discover the latest trends...</p>
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>

          <div className="featured-products-loading"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

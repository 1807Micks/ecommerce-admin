import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useProductStore } from "../stores/useProductStore.js";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/CategoryPage.css";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();

  const { category } = useParams();
  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  console.log("products", products);
  return (
    <div className="category-container">
      <div className="content-wrapper">
        <motion.h1
          className="category-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div
          className="product-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="empty-message">No products found</h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;

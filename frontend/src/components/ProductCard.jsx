import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

import "../styles/ProductCard.css";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img className="product-img" src={product.image} alt="product image" />
        <div className="image-overlay" />
      </div>

      <div className="card-content">
        <h5 className="product-title">{product.name}</h5>
        <div className="price-container">
          <p>
            <span className="price-text">${product.price}</span>
          </p>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={22} className="cart-icon" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

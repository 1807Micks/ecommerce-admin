import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore.js";
import "../styles/CartItem.css";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="cart-item-card">
      <div className="cart-item-content">
        <div className="cart-item-image-container">
          <img className="cart-item-image" src={item.image} alt={item.name} />
        </div>

        <label className="sr-only">Choose quantity:</label>

        <div className="cart-item-controls">
          <div className="quantity-selector">
            <button
              className="qty-btn"
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantity(item._id, item.quantity - 1);
                } else {
                  removeFromCart(item._id); // ✅ remove when quantity is 1
                }
              }}
            >
              <Minus className="qty-icon" />
            </button>
            <p>{item.quantity}</p>
            <button
              className="qty-btn"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="qty-icon" />
            </button>
          </div>

          <div className="price-container">
            <p className="item-price">${item.price}</p>
          </div>
        </div>

        <div className="item-info">
          <p className="item-name">{item.name}</p>
          <p className="item-description">{item.description}</p>

          <div className="remove-btn-container">
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

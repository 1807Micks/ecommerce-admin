import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import CartItem from "../components/CartItem.jsx";
import PeopleAlsoBought from "../components/PeopleAlsoBought.jsx";
import OrderSummery from "../components/OrderSummery.jsx";
import GiftCouponCard from "../components/GiftCouponCard.jsx";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <div className="cart-layout">
          <motion.div
            className="cart-items-column"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="cart-items-list">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}

            {/* Show recommendations if items are in cart */}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="cart-summery-column"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummery />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyCartUI = () => (
  <motion.div
    className="empty-cart-container"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="empty-cart-icon" size={64} />
    <h3 className="empty-cart-title">Your cart is empty</h3>
    <p className="empty-cart-text">
      Looks like you haven't added anything to your cart yet.
    </p>
    <Link className="start-shopping-btn" to="/">
      Start Shopping
    </Link>
  </motion.div>
);

export default CartPage;

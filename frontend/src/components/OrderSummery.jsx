import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

import { useCartStore } from "../stores/useCartStore.js";
import "../styles/OrderSummery.css"; // ✅ fixed spelling

const OrderSummery = () => {
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();

  const savings = Math.max(0, subtotal - total); // ✅ guard against negative
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <motion.div
      className="order-summery-container" // ✅ fixed spelling
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="title">Order Summery</p> {/* ✅ fixed spelling */}
      <div className="content-wrapper">
        <div className="price-details-wrapper">
          <dl className="flex-between">
            <dt className="text-label">Original price</dt>
            <dd className="text-value-white">${formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex-between">
              <dt className="text-label">Savings</dt>
              <dd className="text-value-emerald">-${formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex-between">
              <dt className="text-label">Coupon ({coupon.code})</dt>
              <dd className="text-value-emerald">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="total-row">
            <dt className="text-total-label">Total</dt>
            <dd className="text-total-value">${formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className="checkout-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>

        <div className="footer-link-wrapper">
          <span className="text-separator">or</span>
          <Link to="/" className="link-continue">
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummery;

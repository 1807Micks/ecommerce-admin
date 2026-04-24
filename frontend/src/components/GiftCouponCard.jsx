import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import "../styles/GiftCouponCard.css";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, removeCoupon } = useCartStore();

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="coupon-card-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="input-group">
        {/* FIX: removed id from label */}
        <label htmlFor="voucher" className="label-text">
          Do you have a voucher or gift card?
        </label>

        {/* Input has both id and name */}
        <input
          type="text"
          id="voucher"
          name="voucher"
          className="coupon-input"
          placeholder="Enter code here"
          value={userInputCode}
          onChange={(e) => setUserInputCode(e.target.value)}
          required
        />

        <motion.button
          type="button"
          className="btn-apply"
          disabled={!userInputCode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </motion.button>
      </div>

      {isCouponApplied && coupon && (
        <div className="applied-section">
          <h3 className="section-title">Applied Coupon</h3>
          <p className="coupon-info-text">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            type="button"
            className="btn-remove"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className="applied-section">
          <h3 className="section-title">Your Available Coupon:</h3>
          <p className="coupon-info-text">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;

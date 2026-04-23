import "../styles/SuccessCancel.css";

export default function PurchaseCancel() {
  return (
    <div className="purchase-container purchase-cancel">
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed.</p>
      <a href="/cart" className="btn">
        Try Again
      </a>
    </div>
  );
}

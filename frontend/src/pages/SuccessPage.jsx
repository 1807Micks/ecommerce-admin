import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import "../styles/SuccessCancel.css";

export default function PurchaseSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .post("/payments/checkout-success", { sessionId })
        .then((res) => console.log("Order confirmed:", res.data))
        .catch((err) => console.error("Error confirming order:", err));
    }
  }, [sessionId]);

  return (
    <div className="purchase-container purchase-success">
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <a href="/" className="btn">
        Go Home
      </a>
    </div>
  );
}

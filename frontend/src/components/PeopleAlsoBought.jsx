import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/PeopleAlsoBought.css";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInstance.get("/products/recommendations");
        // Ensure recommendations is always an array
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setRecommendations(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching recommendations",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []); // Run only once

  if (isLoading) return <LoadingSpinner />;

  // Don't render anything if there are no recommendations
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="recommendations-wrapper">
      <h3 className="recommendations-title">People also bought</h3>
      <div className="recommendations-grid">
        {Array.isArray(recommendations) &&
          recommendations.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;

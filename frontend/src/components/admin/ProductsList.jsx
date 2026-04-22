import { Trash, Star } from "lucide-react";
import { motion } from "framer-motion";

import { useProductStore } from "../../stores/useProductStore.js";
import "../../styles/adminStyles/ProductList.css";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className="motion-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="product-table">
        <thead className="table-header">
          <tr>
            <th scope="col" className="table-header">
              Product
            </th>
            <th scope="col" className="table-header">
              Price
            </th>
            <th scope="col" className="table-header">
              Category
            </th>
            <th scope="col" className="table-header">
              Featured
            </th>
            <th scope="col" className="table-header">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {products?.map((product) => (
            <tr key={product._id} className="table-divider">
              <td className="product-data">
                <div className="product-info">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="product-name">{product.name}</div>
                </div>
              </td>
              <td className="product-data">
                <div className="product-price">${product.price.toFixed(2)}</div>
              </td>
              <td className="product-data">
                <div className="product-category">{product.category}</div>
              </td>
              <td className="product-data">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`icon-button ${
                    product.isFeatured ? "star-active" : "star-inactive"
                  }`}
                >
                  <Star className="icon" />
                </button>
              </td>
              <td className="product-data">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="delete-btn"
                >
                  <Trash className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;

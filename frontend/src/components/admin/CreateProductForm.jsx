import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

import { categories } from "./Tabs.js";
import { PlusCircle, Upload, Loader } from "lucide-react";

import "../../styles/adminStyles/CreateProductForm.css";

const CreatProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);
  };

  return (
    <motion.div
      className="create-product-contain"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="create-product-h2">Create New Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="create-product-label">
            Product Name
          </label>
          <input
            className="admin-input"
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
        </div>
      </form>
    </motion.div>
  );
};

export default CreatProductForm;

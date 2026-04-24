import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";

import { categories } from "./Tabs.js";
import "../../styles/adminStyles/CreateProductForm.css";
import { useProductStore } from "../../stores/useProductStore.js";

const CreatProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };

  return (
    <motion.div
      className="motion1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="formDiv">
        <h2 className="create-new-product">Create New Product</h2>
        <form onSubmit={handleSubmit} className="form">
          {/* Product Name */}
          <label htmlFor="name" className="name">
            Product Name
          </label>
          <div className="userInput">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="new-product-name"
            />
          </div>

          {/* Description */}
          <label htmlFor="description" className="description">
            Description
          </label>
          <div className="userInput">
            <textarea
              id="description"
              name="description"
              required
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              rows="3"
              className="new-product-description"
            />
          </div>

          {/* Price */}
          <label htmlFor="price" className="price">
            Price
          </label>
          <div className="userInput">
            <input
              type="number"
              id="price"
              name="price"
              required
              value={newProduct.price}
              step="0.01"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="new-product-price"
            />
          </div>

          {/* Category */}
          <label htmlFor="category" className="category">
            Category
          </label>
          <div className="userInput">
            <select
              id="category"
              name="category"
              required
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="new-product-category"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="image-div">
            <div className="userInput">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="new-product-image"
              />
              <label htmlFor="image" className="image">
                <Upload className="image-icon" />
                Upload Image
              </label>
              {newProduct.image && (
                <span className="image-span">Image selected!</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="button" disabled={loading}>
            {loading ? (
              <>
                <Loader className="loaderIcon" aria-hidden="true" />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="buttonIcon" aria-hidden="true" />
                Create Product
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatProductForm;

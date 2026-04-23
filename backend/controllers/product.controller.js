import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error in getAllProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get featured products (with Redis caching)
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featuredProducts");
    if (featuredProducts) {
      return res.json({ products: JSON.parse(featuredProducts) });
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts || featuredProducts.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    res.json({ products: featuredProducts });
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: cloudinaryResponse?.secure_url || "",
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get recommended products (random sample)
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          description: 1,
        },
      },
    ]);
    res.json({ products });
  } catch (error) {
    console.error("Error in getRecommendedProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    console.error("Error in getProductsByCategory:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle featured status of a product
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();
    await updateFeaturedProductsCache();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error in toggleFeaturedProduct:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Helper: update Redis cache for featured products
async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Error in updateFeaturedProductsCache:", error.message);
  }
}

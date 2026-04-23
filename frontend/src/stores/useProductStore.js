import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const categories = [
  { href: "/jeans", name: "jeans", imgUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "t-shirts", imgUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "shoes", imgUrl: "/shoes.jpg" },
  { href: "/glasses", name: "glasses", imgUrl: "/glasses.png" },
  { href: "/jackets", name: "jackets", imgUrl: "/jackets.jpg" },
  { href: "/suits", name: "suits", imgUrl: "/suits.jpg" },
  { href: "/bags", name: "bags", imgUrl: "/bags.jpg" },
];

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));

      toast.success("Product created successfully!");
      return true; // Returns true so the form knows to clear itself
    } catch (error) {
      const message = error.response?.data?.error || "Error creating product";
      toast.error(message);
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      const message = error.response?.data?.error || "failed to fetch products";
      toast.error(message);
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId,
        ),
        loading: false,
      }));

      toast.success("Product deleted!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to delete product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.patch(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product,
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/products/category/${category}`,
      );
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },
}));

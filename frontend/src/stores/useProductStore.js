import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const categories = [
  { href: "/jeans", name: "Jeans", imgUrl: "/jeans.jpg" },
  { href: "/tshirts", name: "T-shirts", imgUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imgUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imgUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imgUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imgUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imgUrl: "/bags.jpg" },
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

  // fetchAllProducts: async() => {},
  // deleteProduct: async(id) => {},
  // toggleFeaturedProduct: async(id) => {}
}));

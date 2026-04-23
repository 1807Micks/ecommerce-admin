import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => String(item.product) === String(productId),
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }
    await user.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Error addToCart controller:", error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => String(item.product) !== String(productId),
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error removeAllFromCart controller:", error);
    res.status(500).json({ message: "Error removing item(s) from cart" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => String(item.product) === String(productId),
    );
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => String(item.product) !== String(productId),
        );
        await user.save();
        return res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updateQuantity controller:", error);
    res.status(500).json({ message: "Error updating item quantity" });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const productIds = req.user.cartItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => String(cartItem.product) === String(product._id),
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.json(cartItems);
  } catch (error) {
    console.error("Error getCartProducts controller:", error);
    res.status(500).json({ message: "Error fetching cart products" });
  }
};

import Cart from "../models/Carts.js";

export class CartService {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate("products.product");
        return cart;
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      throw new Error("Error al obtener carrito");
    }
  }

  async getAllCarts() {
    try {
      return await Cart.find({}).populate("products.product");
    } catch (error) {
      console.error("Error al obtener carritos:", error);
      throw new Error("Error al obtener carritos");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: 1,
        });
      }

      return await cart.save();
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      throw new Error("Error al agregar producto al carrito");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }

      cart.products[productIndex].quantity = quantity;
      return await cart.save();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      throw new Error("Error al actualizar cantidad del producto");
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );

      return await cart.save();
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      throw new Error("Error al eliminar producto del carrito");
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = products;
      return await cart.save();
    } catch (error) {
      console.error("Error al actualizar carrito:", error);
      throw new Error("Error al actualizar carrito");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = [];
      return await cart.save();
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      throw new Error("Error al vaciar carrito");
    }
  }
}



export const cartService = new CartService();

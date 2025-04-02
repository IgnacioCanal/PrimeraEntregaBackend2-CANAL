import { cartDao } from "../DAOs/index.dao.js";

export class CartService {
  async createCart() {
    return await cartDao.createCart();
  }

  async getCartById(cartId) {
    try {
      const cart = await cartDao.getCartById(cartId);
      if (!cart) throw new Error("Carrito no encontrado");
      return cart;
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      throw new Error("Error al obtener carrito");
    }
  }

  async getAllCarts() {
    try {
      return await cartDao.getAllCarts();
    } catch (error) {
      console.error("Error al obtener carritos:", error);
      throw new Error("Error al obtener carritos");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      return await cartDao.addProductToCart(cartId, productId);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      throw new Error("Error al agregar producto al carrito");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      return await cartDao.updateProductQuantity(cartId, productId, quantity);
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      throw new Error("Error al actualizar cantidad del producto");
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      return await cartDao.removeProductFromCart(cartId, productId);
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      throw new Error("Error al eliminar producto del carrito");
    }
  }

  async updateCart(cartId, products) {
    try {
      return await cartDao.updateCart(cartId, products);
    } catch (error) {
      console.error("Error al actualizar carrito:", error);
      throw new Error("Error al actualizar carrito");
    }
  }

  async clearCart(cartId) {
    try {
      return await cartDao.clearCart(cartId);
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      throw new Error("Error al vaciar carrito");
    }
  }
}

export const cartService = new CartService();
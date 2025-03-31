import CartDAO from "../DAO/CartDAO.js";

class CartRepository {
  constructor() {
    this.dao = new CartDAO();
  }

  async createCart() {
    return await this.dao.createCart();
  }

  async getCartById(cartId) {
    return await this.dao.getCartById(cartId);
  }

  async getAllCarts() {
    return await this.dao.getAllCarts();
  }

  async addProductToCart(cartId, productId) {
    return await this.dao.addProductToCart(cartId, productId);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return await this.dao.updateProductQuantity(cartId, productId, quantity);
  }

  async removeProductFromCart(cartId, productId) {
    return await this.dao.removeProductFromCart(cartId, productId);
  }

  async updateCart(cartId, products) {
    return await this.dao.updateCart(cartId, products);
  }

  async clearCart(cartId) {
    return await this.dao.clearCart(cartId);
  }
}

export default CartRepository;

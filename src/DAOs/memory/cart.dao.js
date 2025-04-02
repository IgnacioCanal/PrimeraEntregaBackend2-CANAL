import { v4 as uuidv4 } from "uuid";

let carts = [];

export class CartDaoMemory {
  async createCart() {
    const newCart = {
      _id: uuidv4(),
      products: [],
    };
    carts.push(newCart);
    return newCart;
  }

  async getCartById(cartId) {
    return carts.find((c) => c._id === cartId) || null;
  }

  async getAllCarts() {
    return carts;
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (item) => item.product === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (item) => item.product === productId
    );

    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");

    cart.products[productIndex].quantity = quantity;
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = cart.products.filter(
      (item) => item.product !== productId
    );
    return cart;
  }

  async updateCart(cartId, products) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = products;
    return cart;
  }

  async clearCart(cartId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = [];
    return cart;
  }
}
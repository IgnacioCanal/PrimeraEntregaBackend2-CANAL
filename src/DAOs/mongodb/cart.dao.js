import Cart from "../../models/carts.model.js";

export class CartDaoMongo {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async getCartById(cartId) {
    return await Cart.findById(cartId).populate("products.product");
  }

  async getAllCarts() {
    return await Cart.find({}).populate("products.product");
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIdStr = productId.toString();
    const productIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === productIdStr
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    return await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");

    cart.products[productIndex].quantity = quantity;
    return await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = cart.products.filter(
      (item) => item.product._id.toString() !== productId
    );
    return await cart.save();
  }

  async updateCart(cartId, products) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = products;
    return await cart.save();
  }

  async clearCart(cartId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = [];
    return await cart.save();
  }
}


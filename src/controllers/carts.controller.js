import { cartService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";

class CartsController {
  async getAll(req, res) {
    try {
      const carts = await cartService.getAllCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los carritos" });
    }
  }

  async getById(req, res) {
    const { cartId } = req.params;
    try {
      const cart = await cartService.getCartById(cartId);
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el carrito" });
    }
  }

  async create(req, res) {
    try {
      const newCart = await cartService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el carrito" });
    }
  }

  async addProductToCart(req, res) {
    const { cartId, productId } = req.params;
    try {
      const product = await productsService.getById(productId);
      if (!product) {
        return res.status(400).json({ error: "Producto no encontrado" });
      }
      const updatedCart = await cartService.addProductToCart(cartId, productId);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCart(req, res) {
    const { cartId } = req.params;
    const { products } = req.body;
    try {
      const updatedCart = await cartService.updateCart(cartId, products);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el carrito" });
    }
  }

  async updateProductQuantity(req, res) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ error: "La cantidad debe ser un número entero positivo" });
    }
    try {
      const updatedCart = await cartService.updateProductQuantity(cartId, productId, quantity);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cantidad del producto" });
    }
  }

  async removeProductFromCart(req, res) {
    const { cartId, productId } = req.params;
    try {
      const updatedCart = await cartService.removeProductFromCart(cartId, productId);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto del carrito" });
    }
  }

  async clearCart(req, res) {
    const { cartId } = req.params;
    try {
      const clearedCart = await cartService.clearCart(cartId);
      res.json({ message: "Todos los productos eliminados del carrito", clearedCart });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar productos del carrito" });
    }
  }
}

export const cartsController = new CartsController();
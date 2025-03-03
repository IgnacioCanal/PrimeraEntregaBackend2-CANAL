import { Router } from "express";
import { productsService } from "../services/products.service.js";
import  { cartService } from "../services/carts.service.js";

export const viewsRoutes = Router();

viewsRoutes.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);
    const carts = await cartService.getAllCarts();

    res.render("home", { products, carts });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/realtimeproducts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);

    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/cart/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await cartService.getCartById(cartId);
    const carts = await cartService.getAllCarts();
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const cartCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);

    res.render("cart", {carts, cartCount, products: cart.products});
  } catch (error) {
    console.error("Error al obtener el carrito:", error.message);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});
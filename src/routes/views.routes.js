import { Router } from "express";
import { productsService } from "../services/products.service.js";
import  { cartService } from "../services/carts.service.js";
import { Ticket } from "../models/Ticket.js";


export const viewsRoutes = Router();

viewsRoutes.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);
    let cartCount = 0;
    if (res.locals.currentUser) {
      const cart = await cartService.getCartById(res.locals.currentUser.cartId);
      cartCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    }
    res.render("home", {
      title: "Inicio",
      products,
      cartCount
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/realtimeproducts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);
    let cartCount = 0;
    if (res.locals.currentUser) { // Usa res.locals.currentUser en lugar de req.user
      const cart = await cartService.getCartById(res.locals.currentUser.cartId);
      cartCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    }
    res.render("realTimeProducts", {
      title: "Productos en Tiempo Real",
      products,
      cartCount
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/cart/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await cartService.getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    const cartCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    res.render("cart", {
      title: "Carrito",
      cartCount,
      products: cart.products
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error.message);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

viewsRoutes.get("/tickets", async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }
    const tickets = await Ticket.find({ purchaser: req.user.email }).lean();
    res.render("tickets", { tickets });
  } catch (error) {
    console.error("Error al obtener los tickets:", error);
    res.status(500).json({ error: "Error al obtener los tickets" });
  }
});
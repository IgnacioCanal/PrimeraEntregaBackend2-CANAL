import { Router } from "express";
import { productsService } from "../services/products.service.js";
import  { cartService } from "../services/carts.service.js";
import { ticketService } from "../services/ticket.service.js";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { validateId } from "../middlewares/validate.middleware.js";


export const viewsRoutes = Router();

viewsRoutes.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);
    let cartCount = 0;
    if (res.locals.currentUser && res.locals.currentUser.role !== "admin") {
      const cart = await cartService.getCartById(res.locals.currentUser.cartId);
      cartCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    }
    const mensaje = req.query.mensaje;
    res.render("home", {
      title: "Inicio",
      products,
      cartCount,
      mensaje,
      currentUser: res.locals.currentUser
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

viewsRoutes.get("/realtimeproducts", requireAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await productsService.getAll(page, limit);
    let cartCount = 0;
    if (res.locals.currentUser && res.locals.currentUser.role !== "admin") {
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

viewsRoutes.get("/cart/:cartId", validateId, async (req, res) => {
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
      products: cart.products,
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
    const tickets = await ticketService.getAll({ purchaser: req.user.email });
    res.render("tickets", { tickets });
  } catch (error) {
    console.error("Error al obtener los tickets:", error);
    res.status(500).json({ error: "Error al obtener los tickets" });
  }
});

viewsRoutes.get("/tickets/:ticketId", validateId, async (req, res) => {
  const { ticketId } = req.params;
  try {
    const ticket = await ticketService.getById(ticketId);
    if (!ticket) {
      return res.status(404).render("404", { error: "Ticket no encontrado" });
    }
    res.render("ticket", { ticket, user: req.user });
  } catch (error) {
    console.error("Error al obtener el ticket:", error);
    res.status(500).json({ error: "Error al obtener el ticket" });
  }
});

viewsRoutes.get("/admin/tickets", requireAdmin, async (req, res) => {
  try {
    const tickets = await ticketService.getAll();
    res.render("adminTickets", { tickets });
  } catch (error) {
    console.error("Error al obtener todos los tickets:", error);
    res.status(500).json({ error: "Error al obtener los tickets" });
  }
});

viewsRoutes.get("/admin/carts", requireAdmin, async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.render("adminCarts", { carts });
  } catch (error) {
    console.error("Error al obtener todos los carritos:", error);
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
});
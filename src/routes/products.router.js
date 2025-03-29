import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";

export const productsRouter = Router();

const validateProductFields = (req, res, next) => {
  const { nombre, descripcion, stock, codigo, categoria, precio, status } = req.body;

  if (!nombre || !descripcion || !codigo || !categoria || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios excepto thumbnails" });
  }

  if (typeof precio !== "number" || typeof stock !== "number") {
    return res.status(400).json({ error: "Precio y stock deben ser números" });
  }

  if (status !== undefined && typeof status !== "boolean") {
    return res.status(400).json({ error: "Status debe ser un valor booleano" });
  }

  next();
};

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:productId", productsController.getById);
productsRouter.post("/", validateProductFields, productsController.create);
productsRouter.put("/:productId", validateProductFields, productsController.update);
productsRouter.delete("/:productId", productsController.delete);
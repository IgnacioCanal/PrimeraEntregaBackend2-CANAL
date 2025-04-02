import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { validateId, validate } from "../middlewares/validate.middleware.js";
import {productDto} from "../DTO/products.dto.js";

export const productsRouter = Router();

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:productId", productsController.getById);
productsRouter.post("/", requireAdmin, validateId, validate(productDto), productsController.create);
productsRouter.put("/:productId", requireAdmin, validateId, validate(productDto), productsController.update);
productsRouter.delete("/:productId", requireAdmin, productsController.delete);
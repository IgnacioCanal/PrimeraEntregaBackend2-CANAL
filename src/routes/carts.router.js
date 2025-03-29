import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

export const cartsRouter = Router();

cartsRouter.get("/", cartsController.getAll);
cartsRouter.get("/:cartId", cartsController.getById);
cartsRouter.post("/", cartsController.create);
cartsRouter.post("/:cartId/products/:productId", cartsController.addProductToCart);
cartsRouter.put("/:cartId", cartsController.updateCart);
cartsRouter.put("/:cartId/products/:productId", cartsController.updateProductQuantity);
cartsRouter.delete("/:cartId/products/:productId", cartsController.removeProductFromCart);
cartsRouter.delete("/:cartId", cartsController.clearCart);
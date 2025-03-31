import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { requireUser } from "../middlewares/role.middleware.js";

export const cartsRouter = Router();

cartsRouter.get("/", cartsController.getAll);
cartsRouter.get("/:cartId", cartsController.getById);
cartsRouter.post("/", cartsController.create);
cartsRouter.post("/:cartId/products/:productId", requireUser, cartsController.addProductToCart);
cartsRouter.put("/:cartId", cartsController.updateCart);
cartsRouter.put("/:cartId/products/:productId", cartsController.updateProductQuantity);
cartsRouter.delete("/:cartId/products/:productId", cartsController.removeProductFromCart);
cartsRouter.delete("/:cartId", cartsController.clearCart);
cartsRouter.post("/:cartId/purchase", cartsController.purchase);
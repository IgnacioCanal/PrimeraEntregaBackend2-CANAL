import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { requireUser, requireAdmin } from "../middlewares/role.middleware.js";
import { validateId, validate } from "../middlewares/validate.middleware.js";
import {cartDto, cartQuantityDto} from "../DTO/cart.dto.js";

export const cartsRouter = Router();

cartsRouter.get("/", requireAdmin, cartsController.getAll);
cartsRouter.get("/:cartId",validateId, cartsController.getById);
cartsRouter.post("/", cartsController.create);
cartsRouter.post("/:cartId/products/:productId",validateId, requireUser, cartsController.addProductToCart);
cartsRouter.put("/:cartId",validateId, validate(cartDto), cartsController.updateCart);
cartsRouter.put("/:cartId/products/:productId",validateId, validate(cartQuantityDto), cartsController.updateProductQuantity);
cartsRouter.delete("/:cartId/products/:productId",validateId, cartsController.removeProductFromCart);
cartsRouter.delete("/:cartId",validateId, cartsController.clearCart);
cartsRouter.post("/:cartId/purchase",validateId, cartsController.purchase);
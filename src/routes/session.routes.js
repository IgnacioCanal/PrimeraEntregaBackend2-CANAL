import { Router } from "express";
import { sessionController } from "../controllers/session.controller.js";
import passport from "passport";
import { validate } from "../middlewares/validate.middleware.js";
import {userDto} from "../DTO/user.dto.js";

export const sessionRouter = Router();

sessionRouter.post("/register", validate(userDto), sessionController.register);
sessionRouter.post("/login", sessionController.login);
sessionRouter.get("/current", passport.authenticate("current", { session: false }), sessionController.getCurrentUser);
sessionRouter.post("/restore-password", sessionController.restorePassword);
sessionRouter.get("/logout", sessionController.logout);
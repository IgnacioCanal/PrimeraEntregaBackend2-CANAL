import { Router } from "express";
import { sessionController } from "../controllers/session.controller.js";
import passport from "passport";

export const sessionRouter = Router();

sessionRouter.post("/register", sessionController.register);
sessionRouter.post("/login", sessionController.login);
sessionRouter.get("/current", passport.authenticate("current", { session: false }), sessionController.getCurrentUser);
sessionRouter.post("/restore-password", sessionController.restorePassword);
sessionRouter.get("/logout", sessionController.logout);
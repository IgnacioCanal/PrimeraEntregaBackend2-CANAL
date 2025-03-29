import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.render("login", { error: req.query.error, message: req.query.message });
});
authRouter.get("/register", (req, res) => {
  res.render("register", { error: req.query.error });
});
authRouter.get("/profile", passport.authenticate("current", { session: false }), (req, res) => {
  res.render("profile", { user: req.user });
});
authRouter.get("/restore-password", (req, res) => {
  res.render("restore-password", { error: req.query.error });
});


import { Router } from "express";

export const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.render("login", { error: req.query.error });
});
authRouter.get("/register", (req, res) => {
  res.render("register", { error: req.query.error });
});
authRouter.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("profile", { user: req.session.user });
});


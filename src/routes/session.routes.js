import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { SECRET } from "../server.js";

export const sessionRouter = Router();

sessionRouter.post("/register",passport.authenticate("register", {
    failureRedirect: "/register?message=fail-register",
    successRedirect: "/login",
  }),
);

sessionRouter.post("/login",passport.authenticate("login", {failureRedirect: "/login?error=Usuario o contraseña incorrectos"}),(req, res) => {
    const token = jwt.sign(req.user, SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: true });

    res.redirect("/");
  }
);



sessionRouter.get("/current", passport.authenticate("current", { session: false }), (req, res) => {
  res.json({usuario: req.user});
});

sessionRouter.post("/restore-password",passport.authenticate("restore-password", {
  failureRedirect: "/restore-password",
  }),
  async (req, res) => {
    res.redirect("/login");
  }
);

sessionRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.session.destroy();
  res.redirect("/");
});
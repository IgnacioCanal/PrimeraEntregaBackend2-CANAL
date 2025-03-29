import passport from "passport";
import jwt from "jsonwebtoken";
import { SECRET } from "../server.js";
import UserDTO from "../DTO/user.modelDTO.js";

class SessionController {
  register(req, res, next) {
    passport.authenticate("register", {
      failureRedirect: "/register?message=fail-register",
      successRedirect: "/login",
    })(req, res, next);
  }

  login(req, res, next) {
    passport.authenticate("login", {
      failureRedirect: "/login?error=Usuario o contraseña incorrectos",
    })(req, res, () => {
      const token = jwt.sign(req.user, SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production"});
      res.redirect("/");
    });
  }

  async getCurrentUser(req, res) {
    try {
      const userDTO = new UserDTO(req.user);
      res.json({ usuario: userDTO });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el usuario actual" });
    }
  }

  restorePassword(req, res, next) {
    passport.authenticate("restore-password", {
      failureRedirect: "/restore-password",
    })(req, res, () => {
      res.redirect("/login");
    });
  }

  logout(req, res) {
    res.clearCookie("token");
    req.session.destroy();
    res.redirect("/");
  }
}

export const sessionController = new SessionController();
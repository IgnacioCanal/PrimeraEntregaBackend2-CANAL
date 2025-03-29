import passport from "passport";
import jwt from "jsonwebtoken";
import { SECRET } from "../server.js";
import UserDTO from "../DTO/user.modelDTO.js";

class SessionController {
  register(req, res, next) {
    passport.authenticate("register", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect("/register?message=fail-register");
      res.redirect("/login");
    })(req, res, next);
  }

  login(req, res, next) {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login?error=Usuario o contraseña incorrectos");
      const token = jwt.sign({ _id: user._id },SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      res.redirect("/");
    })(req, res, next);
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
    passport.authenticate("restore-password", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect("/restore-password?error=Usuario no encontrado");
      res.redirect("/login?message=Contraseña restaurada exitosamente");
    })(req, res, next);
  }

  logout(req, res) {
    if (req.cookies.token) {
      res.clearCookie("token");
    }
    res.redirect("/");
  }
}

export const sessionController = new SessionController();
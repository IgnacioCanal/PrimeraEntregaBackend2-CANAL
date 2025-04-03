import passport from "passport";
import jwt from "jsonwebtoken";
import { SECRET } from "../server.js";
import { userDto } from "../DTO/user.dto.js";

class SessionController {
  register(req, res, next) {
    passport.authenticate("register", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        const errorMessage = encodeURIComponent(info.message || "Error al registrar");
        return res.redirect(`/register?error=${errorMessage}`);
      }
      return res.redirect("/login?message=register-success");
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
      const { error, value } = userDto.validate(req.user, { stripUnknown: true });
      if (error) {
        return res.status(400).json({ error: "Datos del usuario inválidos", details: error.details });
      }
      res.json({ usuario: value });
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
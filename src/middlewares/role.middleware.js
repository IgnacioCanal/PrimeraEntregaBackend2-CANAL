export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.redirect("/?mensaje=Acceso denegado. Se requiere rol de administrador.");
  }
  next();
};

export const requireUser = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({ error: "Acceso denegado. Se requiere rol de usuario." });
  }
  next();
};

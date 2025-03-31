import path from "path";
import morgan from "morgan";
import express from "express";
import { createServer } from "http";
import exphbs from "express-handlebars";
import connectDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import jwt from "jsonwebtoken";
import { userModel } from "./models/user.model.js";

import { __dirname } from "./dirname.js";
import { CONFIG } from "./config/config.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRoutes } from "./routes/views.routes.js";
import { sessionRouter } from "./routes/session.routes.js";
import { initSocket } from "./socket.js";
import { authRouter } from "./routes/auth.routes.js";
import { cartService } from "./services/carts.service.js";

const app = express();
export const SECRET = "clavesecreta";

const hbs = exphbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views", "layout"),
  partialsDir: path.join(__dirname, "views", "partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

hbs.handlebars.registerHelper("multiply", (a, b) => a * b);
hbs.handlebars.registerHelper("eq", function(a, b) { return a === b; });
hbs.handlebars.registerHelper("formatDate", function(date) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(date).toLocaleDateString("es-ES", options);
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const startServer = async () => {

  await connectDB();

  initializePassport();
  app.use(passport.initialize());


  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, "../public")));
  app.use(cookieParser());

  app.use(async (req, res, next) => {
    if (req.cookies.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, SECRET);
        const user = await userModel.findById(decoded._id).lean();
        req.user = user;
        res.locals.currentUser = user || null;
        if (user && user.role !== "admin") {
          const cart = await cartService.getCartById(user.cartId);
          res.locals.cartCount = cart ? cart.products.reduce((acc, item) => acc + item.quantity, 0) : 0;
        } else {
          res.locals.cartCount = 0;
        }
      } catch (error) {
        console.error("Error en middleware de autenticación:", error);
        req.user = null;
        res.locals.currentUser = null;
        res.locals.cartCount = 0;
      }
    } else {
      req.user= null;
      res.locals.currentUser = null;
      res.locals.cartCount = 0;
    }
    next();
  });


  app.use("/", viewsRoutes);
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/", authRouter);


  app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).send("Ocurrió un error interno en el servidor");
  });

  const server = createServer(app);
  initSocket(server);



  server.listen(CONFIG.PORT, () => {
    console.log(`Server running on port http://localhost:${CONFIG.PORT}`);
  });
};


startServer();
import path from "path";
import morgan from "morgan";
import express from "express";
import { createServer } from "http";
import exphbs from "express-handlebars";
import connectDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import { __dirname } from "./dirname.js";
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

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const startServer = async () => {

  await connectDB();


  app.use(
    session({
      secret: SECRET,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 24 * 60 * 60,
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      }
    })
  );


  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());


  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, "../public")));
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
  });

  app.use(async (req, res, next) => {
    if (req.user) {
      try {
        const cart = await cartService.getCartById(req.user.cartId);
        res.locals.cartCount = cart ? cart.products.reduce((acc, item) => acc + item.quantity, 0) : 0;
      } catch (error) {
        console.error("Error al obtener cartCount:", error);
        res.locals.cartCount = 0;
      }
    } else {
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
    if (req.accepts("html")) {
      res.status(500).render("error", { message: "Ocurrió un error interno en el servidor" });
    } else {
      res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
    }
  });

  const server = createServer(app);
  initSocket(server);



  server.listen(8080, () => {
    console.log("Server running on port http://localhost:8080");
  });
};


startServer();
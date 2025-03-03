import path from "path";
import morgan from "morgan";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import exphbs from "express-handlebars";
import connectDB from "./config/mongodb.js";

import { __dirname } from "./dirname.js";
import { productsRouter } from "./routes/products.router.js";
import { productsService } from "./services/products.service.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRoutes } from "./routes/views.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

const hbs = exphbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views", "layout"),
  partialsDir: path.join(__dirname, "views", "partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewsRoutes);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.emit("init", productsService.getAll().docs);

  socket.on("agregarProducto", async (product) => {
    try {
      await productsService.addProduct(product);
      const productosActualizados = await productsService.getAll({ page: 1 });
      const totalPages = productosActualizados.totalPages;
      const productosUltimaPagina = await productsService.getAll({ page: totalPages });
      io.emit("actualizarProductos", productosUltimaPagina, totalPages);
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
      socket.emit("error", error.message);
    }
  });

  socket.on("eliminarProducto", async ({ nombre, currentPage }) => {
    try {
      await productsService.deleteProduct(nombre);
      const productosActualizados = await productsService.getAll({ page: currentPage });
      io.emit("actualizarProductos", productosActualizados, productosActualizados.totalPages);
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
      socket.emit("error", error.message);
    }
  });
});

server.listen(8080, () => {
  console.log("Server running on port http://localhost:8080");
});

connectDB();

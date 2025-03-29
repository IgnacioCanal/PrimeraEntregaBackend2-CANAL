import ProductDAO from "../DAO/ProductDAO.js";

const productDAO = new ProductDAO();

export class ProductsService {
  async getAll(page , limit) {
    return await productDAO.getAll(page, limit);
  }

  async countDocuments(filter = {}) {
    return await productDAO.countDocuments(filter);
  }

  async getById(productId) {
    return await productDAO.getById(productId);
  }

  async create(productData) {
    return await productDAO.create(productData);
  }

  async addProduct({ nombre, precio, stock }) {
    if (!nombre || !precio || !stock) {
      throw new Error("Faltan datos obligatorios: nombre, precio o stock");
    }
    const productData = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      descripcion: "Sin descripción",
      codigo: Date.now().toString(),
      categoria: "Sin categoría",
    };
    return await productDAO.create(productData);
  }

  async update(productId, productData) {
    return await productDAO.update(productId, productData);
  }

  async delete(productId) {
    return await productDAO.delete(productId);
  }

  async deleteProduct(nombre) {
    return await productDAO.deleteByName(nombre);
  }
}

export const productsService = new ProductsService();

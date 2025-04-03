import { productDao } from "../DAOs/index.dao.js";

export class ProductsService {

  async getAll(page , limit) {
    return await productDao.getAll(page, limit);
  }

  async countDocuments(filter = {}) {
    return await productDao.countDocuments(filter);
  }

  async getById(productId) {
    return await productDao.getById(productId);
  }

  async create(productData) {
    return await productDao.create(productData);
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
    return await productDao.create(productData);
  }

  async update(productId, productData) {
    return await productDao.update(productId, productData);
  }

  async delete(productId) {
    return await productDao.delete(productId);
  }

  async deleteProduct(nombre) {
    return await productDao.deleteByName(nombre);
  }
}

export const productsService = new ProductsService();

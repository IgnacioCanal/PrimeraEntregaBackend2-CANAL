import ProductRepository from "../repositories/product.repository.js";

const productRepository = new ProductRepository();

export class ProductsService {
  async getAll(page , limit) {
    return await productRepository.getAll(page, limit);
  }

  async countDocuments(filter = {}) {
    return await productRepository.countDocuments(filter);
  }

  async getById(productId) {
    return await productRepository.getById(productId);
  }

  async create(productData) {
    return await productRepository.create(productData);
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
    return await productRepository.create(productData);
  }

  async update(productId, productData) {
    return await productRepository.update(productId, productData);
  }

  async delete(productId) {
    return await productRepository.delete(productId);
  }

  async deleteProduct(nombre) {
    return await productRepository.deleteByName(nombre);
  }
}

export const productsService = new ProductsService();

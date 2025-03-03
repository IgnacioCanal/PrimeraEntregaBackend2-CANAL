import { Product } from "../models/Products.js";

export class ProductsService {
  async getAll(page , limit) {
    return await Product.paginate( {}, { page: Number(page), limit: Number(limit) }
    );
  }

  async countDocuments(filter = {}) {
    return await Product.countDocuments(filter);
  }

  async getById(productId) {
    return await Product.findById(productId);
  }

  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async addProduct({ nombre, precio, stock }) {
    if (!nombre || !precio || !stock) {
      throw new Error("Faltan datos obligatorios: nombre, precio o stock");
    }
    const product = new Product({
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      descripcion: "Sin descripción",
      codigo: Date.now().toString(),
      categoria: "Sin categoría",
    });
    return await product.save();
  }

  async update(productId, productData) {
    return await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
  }

  async delete(productId) {
    return await Product.findByIdAndDelete(productId);
  }

  async deleteProduct(nombre) {
    return await Product.findOneAndDelete({ nombre });
  }
}

export const productsService = new ProductsService();

import { Product } from "../../models/products.model.js";

export class productDaoMongo {
  async getAll(page, limit) {
    return await Product.paginate({}, { page: Number(page), limit: Number(limit) });
  }

  async getById(productId) {
    return await Product.findById(productId);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(productId, productData) {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
  }

  async delete(productId) {
    return await Product.findByIdAndDelete(productId);
  }

  async countDocuments(filter = {}) {
    return await Product.countDocuments(filter);
  }

  async deleteByName(nombre) {
    return await Product.findOneAndDelete({ nombre });
  }
}

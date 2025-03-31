import ProductDAO from "../DAO/ProductDAO.js";

class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }

  async getAll(page, limit) {
    // Si es necesario, se pueden hacer validaciones o transformaciones aquí.
    return await this.dao.getAll(page, limit);
  }

  async getById(productId) {
    return await this.dao.getById(productId);
  }

  async create(productData) {
    return await this.dao.create(productData);
  }

  async update(productId, productData) {
    return await this.dao.update(productId, productData);
  }

  async delete(productId) {
    return await this.dao.delete(productId);
  }

  async countDocuments(filter = {}) {
    return await this.dao.countDocuments(filter);
  }

  async deleteByName(nombre) {
    return await this.dao.deleteByName(nombre);
  }
}

export default ProductRepository;

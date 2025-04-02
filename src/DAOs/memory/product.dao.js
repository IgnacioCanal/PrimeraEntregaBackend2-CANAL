import { v4 as uuidv4 } from "uuid";

let products = [];

export class productDaoMemory {
  async getAll(page, limit) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      docs: products.slice(start, end),
      totalDocs: products.length,
      limit,
      page,
      totalPages: Math.ceil(products.length / limit),
    };
  }

  async getById(productId) {
    return products.find((p) => p._id === productId) || null;
  }

  async create(productData) {
    const newProduct = {
      _id: uuidv4(),
      ...productData,
    };
    products.push(newProduct);
    return newProduct;
  }

  async update(productId, productData) {
    const index = products.findIndex((p) => p._id === productId);
    if (index === -1) return null;
    products[index] = { ...products[index], ...productData };
    return products[index];
  }

  async delete(productId) {
    const index = products.findIndex((p) => p._id === productId);
    if (index === -1) return null;
    const deleted = products.splice(index, 1)[0];
    return deleted;
  }

  async countDocuments(filter = {}) {
    return products.length;
  }

  async deleteByName(nombre) {
    const index = products.findIndex((p) => p.nombre === nombre);
    if (index === -1) return null;
    const deleted = products.splice(index, 1)[0];
    return deleted;
  }
}
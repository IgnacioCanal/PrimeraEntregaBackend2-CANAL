import { userDao } from "../DAOs/index.dao.js";

export class UserService {
  async getAll() {
    return await userDao.getAll();
  }

  async getById(userId) {
    return await userDao.getById(userId);
  }

  async create(userData) {
    return await userDao.create(userData);
  }

  async update(userId, userData) {
    return await userDao.update(userId, userData);
  }

  async delete(userId) {
    return await userDao.delete(userId);
  }

  async findByEmail(email) {
    return await userDao.findByEmail(email);
  }
}

export const userService = new UserService();
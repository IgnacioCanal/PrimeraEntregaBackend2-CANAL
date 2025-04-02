import { v4 as uuidv4 } from "uuid";

let users = []; // Array en memoria

export class UserDaoMemory {
  async getAll() {
    return users;
  }

  async getById(userId) {
    return users.find((u) => u._id === userId) || null;
  }

  async create(userData) {
    const newUser = {
      _id: uuidv4(),
      ...userData,
    };
    users.push(newUser);
    return newUser;
  }

  async update(userId, userData) {
    const index = users.findIndex((u) => u._id === userId);
    if (index === -1) return null;
    users[index] = { ...users[index], ...userData };
    return users[index];
  }

  async delete(userId) {
    const index = users.findIndex((u) => u._id === userId);
    if (index === -1) return null;
    const deleted = users.splice(index, 1)[0];
    return deleted;
  }

  async findByEmail(email) {
    return users.find((u) => u.email === email) || null;
  }
}
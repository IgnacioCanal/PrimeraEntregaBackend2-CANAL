import { userModel } from "../../models/user.model.js";

export class UserDaoMongo {
  async getAll() {
    return await userModel.find();
  }

  async getById(userId) {
    return await userModel.findById(userId);
  }

  async create(userData) {
    return await userModel.create(userData);
  }

  async update(userId, userData) {
    return await userModel.findByIdAndUpdate(userId, userData, { new: true });
  }

  async delete(userId) {
    return await userModel.findByIdAndDelete(userId);
  }

  async findByEmail(email) {
    return await userModel.findOne({ email });
  }
}
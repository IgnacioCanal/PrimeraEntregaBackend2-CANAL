import { Schema, model } from "mongoose";
import { _id } from "./carts.model.js";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartId: _id
});

export const userModel = model("user", userSchema);
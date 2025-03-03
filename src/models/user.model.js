import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartId:{ type:Schema.Types.ObjectId, ref:"Cart"},
  role: { type: String, default: "user" },
});

export const userModel = model("user", userSchema);
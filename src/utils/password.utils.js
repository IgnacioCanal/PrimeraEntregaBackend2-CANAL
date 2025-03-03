import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  return await bcrypt.hash(password, bcrypt.genSaltSync(10));
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
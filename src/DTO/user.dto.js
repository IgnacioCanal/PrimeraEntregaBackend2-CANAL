import Joi from "joi";

export const userDto = Joi.object({
  first_name: Joi.string().required().min(3).max(15).messages({
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre debe tener menos de 15 caracteres",
  }),
  last_name: Joi.string().required().min(2).max(20).messages({
    "string.empty": "El apellido no puede estar vacío",
    "any.required": "El apellido es obligatorio",
    "string.min": "El apellido debe tener al menos 2 caracteres",
    "string.max": "El apellido debe tener menos de 20 caracteres",
  }),
  age: Joi.number().integer().min(18).max(100).required().messages({
    "number.base": "La edad debe ser un número",
    "number.integer": "La edad debe ser un número entero",
    "number.min": "La edad debe ser mayor a 18",
    "number.max": "La edad debe ser menor o igual a 100",
    "any.required": "La edad es obligatoria",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser un correo válido",
    "string.empty": "El email no puede estar vacío",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().min(4).required().messages({
    "string.min": "La contraseña debe tener al menos 4 caracteres",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  }),
  cartId: Joi.string().optional().messages({
    "string.base": "El cartId debe ser una cadena",
  }),
  role: Joi.string().valid("user", "admin").default("user").messages({
    "any.only": "El rol debe ser 'user' o 'admin'",
  }),
});
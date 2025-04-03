import Joi from "joi";

export const productDto = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre es obligatorio",
  }),
  descripcion: Joi.string().optional(),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock debe ser un número",
    "number.integer": "El stock debe ser un número entero",
    "number.min": "El stock no puede ser negativo",
    "any.required": "El stock es obligatorio",
  }),
  codigo: Joi.string().optional(),
  categoria: Joi.string().optional(),
  precio: Joi.number().min(2).required().messages({
    "number.base": "El precio debe ser un número",
    "number.min": "El precio debe ser mayor o igual a 2",
    "any.required": "El precio es obligatorio",
  }),
  status: Joi.boolean().optional().messages({
    "boolean.base": "El status debe ser un valor booleano",
  }),
  thumbnails: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Thumbnails debe ser un arreglo",
    "string.base": "Cada thumbnail debe ser una cadena",
  }),
});
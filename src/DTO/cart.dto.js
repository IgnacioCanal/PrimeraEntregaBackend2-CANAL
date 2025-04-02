import Joi from "joi";

export const cartDto = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          "any.required": "El ID del producto es obligatorio",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "La cantidad debe ser un número",
          "number.integer": "La cantidad debe ser un entero",
          "number.min": "La cantidad debe ser al menos 1",
          "any.required": "La cantidad es obligatoria",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Los productos deben ser un arreglo",
      "any.required": "Los productos son obligatorios",
    }),
});

export const cartQuantityDto = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "La cantidad debe ser un número",
    "number.integer": "La cantidad debe ser un entero",
    "number.min": "La cantidad debe ser al menos 1",
    "any.required": "La cantidad es obligatoria",
  }),
});
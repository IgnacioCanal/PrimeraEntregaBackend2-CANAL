import mongoose from "mongoose";
import { validate as uuidValidate } from "uuid";
import { CONFIG } from "../config/config.js";
import { PERSISTENCE } from "../common/constants/persistence.js";

export function validate(dto) {
  return async (req, res, next) => {
    const { error } = dto.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}


export function validateId(req, res, next) {
  const { cartId, productId, ticketId } = req.params;
  const id = cartId || productId || ticketId;

  if (!id) {
    return res.status(400).json({ error: "ID no proporcionado" });
  }

  switch (CONFIG.PERSISTENCE) {
    case PERSISTENCE.MONGODB:
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido para MongoDB" });
      }
      break;
    case PERSISTENCE.MEMORY:
      if (!uuidValidate(id)) {
        return res.status(400).json({ error: "ID inválido para memoria (UUID)" });
      }
      break;
    default:
      return res.status(500).json({ error: "Persistencia no configurada" });
  }
  next();
}

import { productDaoMemory } from "./product.dao.js";
import { CartDaoMemory } from "./cart.dao.js";
import { UserDaoMemory } from "./user.dao.js";
import { TicketDaoMemory } from "./ticket.dao.js";

export const memoryDaos = {
  productDao: new productDaoMemory(),
  cartDao: new CartDaoMemory(),
  userDao: new UserDaoMemory(),
  ticketDao: new TicketDaoMemory(),
};
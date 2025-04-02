import { productDaoMongo } from "./product.dao.js";
import { CartDaoMongo } from "./cart.dao.js";
import { UserDaoMongo } from "./user.dao.js";
import { TicketDaoMongo } from "./ticket.dao.js";

export const mongodbDaos = {
  productDao: new productDaoMongo(),
  cartDao: new CartDaoMongo(),
  userDao: new UserDaoMongo(),
  ticketDao: new TicketDaoMongo(),
};
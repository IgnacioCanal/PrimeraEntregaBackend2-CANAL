import { Ticket } from "../../models/ticket.model.js";

export class TicketDaoMongo {
  async create(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getById(ticketId) {
    return await Ticket.findById(ticketId).populate("products.product").lean();
  }

  async getAll(filter = {}) {
    return await Ticket.find(filter).populate("products.product").lean();
  }
}
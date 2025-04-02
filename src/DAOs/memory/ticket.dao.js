import { v4 as uuidv4 } from "uuid";

let tickets = [];

export class TicketDaoMemory {
  async create(ticketData) {
    const newTicket = {
      _id: uuidv4(),
      code: `TICKET-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      purchase_datetime: new Date(),
      ...ticketData,
    };
    tickets.push(newTicket);
    return newTicket;
  }

  async getById(ticketId) {
    return tickets.find((t) => t._id === ticketId) || null;
  }

  async getAll(filter = {}) {
    if (Object.keys(filter).length === 0) return tickets;
    return tickets.filter((ticket) =>
      Object.keys(filter).every((key) => ticket[key] === filter[key])
    );
  }
}
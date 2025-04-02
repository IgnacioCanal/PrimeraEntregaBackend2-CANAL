import { ticketDao } from "../DAOs/index.dao.js";

export class TicketService {
  async create(ticketData) {
    return await ticketDao.create(ticketData);
  }

  async getById(ticketId) {
    return await ticketDao.getById(ticketId);
  }

  async getAll(filter ={}) {
    return await ticketDao.getAll(filter);
  }
}

export const ticketService = new TicketService();
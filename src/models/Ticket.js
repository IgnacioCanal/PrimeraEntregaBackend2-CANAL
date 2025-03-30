import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }
}, {
  timestamps: true
});

ticketSchema.pre("validate", function (next) {
  if (!this.code) {
    this.code = `TICKET-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }
  next();
});

export const Ticket = model("Ticket", ticketSchema);
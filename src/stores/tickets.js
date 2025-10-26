import { defineStore } from "pinia";
import { createTicket, updateTicket } from "../services/ticketsService.js";

function setPolite(msg) {
  const n = document.getElementById("toast-live-polite");
  if (n) n.textContent = msg;
}

export const useTicketActionsStore = defineStore("ticketsActions", {
  actions: {
    async createT({ title, description, status }) {
      const t = await createTicket({ title, description, status });
      setPolite("Ticket created.");
      return t;
    },
    async updateT({ id, title, description, status }) {
      await updateTicket({ id, title, description, status });
      setPolite("Ticket updated.");
      return true;
    },
  },
});

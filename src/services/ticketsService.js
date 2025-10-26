import { readJSON, writeJSON } from "../utils/storage.js";
import { LS_KEYS, ALLOWED_STATUS } from "../utils/constants.js";
import { makeError } from "../utils/errors.js";

const FAILURE_RATE = Number(import.meta.env.VITE_FAILURE_RATE || 0);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validateTicketFields({ title, status, description }) {
  if (!title || !title.trim()) {
    throw makeError(
      "VALIDATION_ERROR",
      "Title is required.",
      { fields: { title: "Title is required." } }
    );
  }
  if (!ALLOWED_STATUS.includes(status)) {
    throw makeError(
      "VALIDATION_ERROR",
      "Status is invalid.",
      { fields: { status: "Must be open, in_progress, or closed." } }
    );
  }
  if (description && description.length > 500) {
    throw makeError(
      "VALIDATION_ERROR",
      "Description cannot exceed 500 characters.",
      { fields: { description: "Too long (max 500 chars)" } }
    );
  }
}

export async function fetchTickets() {
  await delay(150);
  if (Math.random() < FAILURE_RATE) {
    throw makeError(
      "NETWORK_ERROR",
      "Failed to load tickets. Please retry.",
      {}
    );
  }
  const list = readJSON(LS_KEYS.TICKETS, []);
  return Array.isArray(list) ? list : [];
}

export async function createTicket({ title, description, status }) {
  validateTicketFields({ title, status, description });

  const now = new Date().toISOString();
  const all = readJSON(LS_KEYS.TICKETS, []);

  const newTicket = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: title.trim(),
    description: description?.trim() || "",
    status,
    createdAt: now,
    updatedAt: now,
  };

  const next = [newTicket, ...all];
  writeJSON(LS_KEYS.TICKETS, next);
  return newTicket;
}

export async function updateTicket({ id, title, description, status }) {
  validateTicketFields({ title, status, description });
  if (!id) {
    throw makeError("VALIDATION_ERROR", "Missing ticket ID.", {});
  }

  const all = readJSON(LS_KEYS.TICKETS, []);
  const next = all.map((t) =>
    t.id === id
      ? {
          ...t,
          title: title.trim(),
          description: description?.trim() || "",
          status,
          updatedAt: new Date().toISOString(),
        }
      : t
  );
  writeJSON(LS_KEYS.TICKETS, next);
  return true;
}

export async function deleteTicket(id) {
  await delay(120);
  if (Math.random() < FAILURE_RATE) {
    throw makeError(
      "NETWORK_ERROR",
      "Failed to delete ticket. Please retry.",
      {}
    );
  }

  const all = readJSON(LS_KEYS.TICKETS, []);
  const next = all.filter((t) => t.id !== id);
  writeJSON(LS_KEYS.TICKETS, next);
  return true;
}

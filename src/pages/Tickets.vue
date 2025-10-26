<template>
  <div class="min-h-screen flex flex-col bg-surface-subtle text-text">
    <Navbar />

    <main class="flex-1 page-shell py-6 space-y-6">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-display-md font-semibold text-text">Tickets</h1>
          <p class="text-body-sm text-text-dim">Manage and track all requests.</p>
        </div>
        <button @click="startCreate" class="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none">+ New Ticket</button>
      </header>

      <TicketsList :tickets="tickets" :loading="loading" :loadError="loadError" @retry="loadData" @view="startEdit" @edit="startEdit" @delete="askDelete" />

      <TicketForm v-if="showForm" :mode="formMode" :initialTicket="activeTicket" :onSave="handleSave" :onCancel="cancelForm" />

      <ConfirmDeleteModal v-if="ticketToDelete" :ticketTitle="ticketToDelete.title" :onConfirm="confirmDelete" :onCancel="cancelDelete" />
    </main>

    <footer class="border-t border-surface-border bg-surface py-4 text-center text-body-xs text-text-dim">
      <div class="page-shell">© {{ year }} TicketApp — All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import TicketsList from "../components/TicketsList.vue";
import TicketForm from "../components/TicketForm.vue";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";
import { fetchTickets, deleteTicket } from "../services/ticketsService.js";
import { useTicketActionsStore } from "../stores/tickets.js";
import { MSG_LOAD_ERROR, MSG_DELETE_ERROR } from "../utils/constants.js";

const year = new Date().getFullYear();
const ticketActions = useTicketActionsStore();

const tickets = ref([]);
const loading = ref(true);
const loadError = ref(null);

const showForm = ref(false);
const formMode = ref("create"); // "create" | "edit"
const activeTicket = ref(null);
const ticketToDelete = ref(null);

async function loadData() {
  loading.value = true;
  loadError.value = null;
  try {
    const data = await fetchTickets();
    tickets.value = data || [];
  } catch (err) {
    loadError.value = MSG_LOAD_ERROR;
    const n = document.getElementById("toast-live-assertive");
    if (n) n.textContent = MSG_LOAD_ERROR;
  } finally {
    loading.value = false;
  }
}
loadData();

function startCreate() {
  formMode.value = "create";
  activeTicket.value = null;
  showForm.value = true;
}
function startEdit(ticket) {
  formMode.value = "edit";
  activeTicket.value = ticket;
  showForm.value = true;
}
function cancelForm() {
  showForm.value = false;
  activeTicket.value = null;
}
async function handleSave({ id, title, description, status }) {
  if (formMode.value == "edit" && id) {
    await ticketActions.updateT({ id, title, description, status });
  } else {
    await ticketActions.createT({ title, description, status });
  }
  await loadData();
  showForm.value = false;
  activeTicket.value = null;
}

function askDelete(ticket) { ticketToDelete.value = ticket; }
function cancelDelete() { ticketToDelete.value = null; }

async function confirmDelete() {
  if (!ticketToDelete.value) return { ok: false };
  const id = ticketToDelete.value.id;
  const prev = [...tickets.value];
  tickets.value = prev.filter((t) => t.id !== id);
  try {
    await deleteTicket(id);
    ticketToDelete.value = null;
    return { ok: true };
  } catch (err) {
    tickets.value = prev; // rollback
    const n = document.getElementById("toast-live-assertive");
    if (n) n.textContent = MSG_DELETE_ERROR;
    return { ok: false };
  }
}
</script>

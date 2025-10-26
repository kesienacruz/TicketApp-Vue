<template>
  <div class="min-h-screen flex flex-col bg-surface-subtle text-text">
    <Navbar />

    <main class="flex-1 page-shell py-6 space-y-8">
      <section class="relative overflow-hidden rounded-card border border-surface-border bg-surface shadow-card px-6 py-6 md:px-8 md:py-8">
        <div class="pointer-events-none select-none absolute -top-24 -left-24 w-[220px] blur-2xl opacity-60 md:w-[280px] md:-top-28 md:-left-28 bg-brand-500 rounded-full" aria-hidden="true"></div>
        <div class="pointer-events-none select-none absolute top-4 right-4 w-20 blur-xl opacity-80 md:w-28 md:top-6 md:right-6 bg-brand-600 rounded-full" aria-hidden="true"></div>

        <header class="relative space-y-2">
          <h1 class="text-display-lg font-semibold text-text">Welcome back 👋</h1>
          <p class="text-body-md text-text-dim">Quick snapshot of your tickets.</p>
        </header>

        <p v-if="loadError" class="text-body-sm text-danger-text mt-4" role="alert" aria-live="assertive">
          {{ loadError }}
        </p>
      </section>

      <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open" :value="stats.open" hint="Needs attention" />
        <StatCard label="In Progress" :value="stats.in_progress" hint="Being worked on" />
        <StatCard label="Closed" :value="stats.closed" hint="Resolved" />
        <StatCard label="Total" :value="stats.total" hint="All tickets" />
      </section>

      <section>
        <RouterLink to="/tickets" class="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none">
          View Tickets →
        </RouterLink>
      </section>
    </main>

    <footer class="border-t border-surface-border bg-surface py-4 text-center text-body-xs text-text-dim">
      <div class="page-shell">© {{ year }} TicketApp — All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { fetchTickets } from "../services/ticketsService.js";
import { MSG_LOAD_ERROR } from "../utils/constants.js";
import StatCard from "../components/StatCard.vue";

const year = new Date().getFullYear();
const tickets = ref([]);
const loadError = ref(null);
const stats = reactive({ open: 0, in_progress: 0, closed: 0, total: 0 });

async function loadStats() {
  loadError.value = null;
  try {
    const list = await fetchTickets();
    tickets.value = list || [];
    let open = 0, inProg = 0, closed = 0;
    for (const t of tickets.value) {
      if (t.status === "open") open++;
      else if (t.status === "in_progress") inProg++;
      else if (t.status === "closed") closed++;
    }
    stats.open = open;
    stats.in_progress = inProg;
    stats.closed = closed;
    stats.total = tickets.value.length;
  } catch (err) {
    loadError.value = MSG_LOAD_ERROR;
    const n = document.getElementById("toast-live-assertive");
    if (n) n.textContent = MSG_LOAD_ERROR;
  }
}
onMounted(loadStats);
</script>

<template>
  <div v-if="loading" class="text-body-sm text-text-dim">Loading tickets…</div>

  <div v-else-if="loadError" class="space-y-3">
    <div class="rounded-card border border-danger-border bg-danger-bg px-3 py-2 text-danger-text text-body-sm" role="alert" aria-live="assertive">
      {{ loadError }}
    </div>
    <button @click="$emit('retry')" class="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none">
      Retry
    </button>
  </div>

  <div v-else-if="!tickets || tickets.length === 0" class="text-body-sm text-text-dim">No tickets yet.</div>

  <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <TicketCard v-for="t in tickets" :key="t.id" :ticket="t" @view="$emit('view', t)" @edit="$emit('edit', t)" @delete="$emit('delete', t)" />
  </div>
</template>

<script setup>
import TicketCard from "./TicketCard.vue";
defineProps({ tickets: Array, loading: Boolean, loadError: String });
defineEmits(["retry", "view", "edit", "delete"]);
</script>

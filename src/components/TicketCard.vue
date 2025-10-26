<template>
  <article class="card p-4 flex flex-col gap-4 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none" tabindex="0" :aria-label="`Ticket: ${ticket.title}`">
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
      <div class="flex-1 min-w-0">
        <h2 class="text-body-md font-semibold text-text break-words">{{ ticket.title || "Untitled ticket" }}</h2>
        <p class="text-body-xs text-text-dim text-[12px] leading-[16px]">Created {{ formattedDate }}</p>
      </div>
      <TicketStatusBadge :status="ticket.status" />
    </div>
    <p class="text-body-sm text-text-dim max-h-[3.75rem] overflow-hidden text-ellipsis break-words">{{ ticket.description || "No description provided." }}</p>
    <div class="flex flex-wrap gap-3">
      <button @click="$emit('view', ticket)" class="rounded-pill border border-surface-border bg-surface px-3 py-1.5 text-[13px] leading-[16px] font-medium text-text hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none" :aria-label="`View ticket ${ticket.title}`" title="View">View</button>
      <button @click="$emit('edit', ticket)" class="rounded-pill bg-brand-600 px-3 py-1.5 text-[13px] leading-[16px] font-medium text-white hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none" :aria-label="`Edit ticket ${ticket.title}`" title="Edit">Edit</button>
      <button @click="$emit('delete', ticket)" class="rounded-pill bg-danger-text px-3 py-1.5 text-[13px] leading-[16px] font-medium text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none" :aria-label="`Delete ticket ${ticket.title}`" title="Delete">Delete</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import TicketStatusBadge from "./TicketStatusBadge.vue";
const props = defineProps({ ticket: { type: Object, required: true } });
const formattedDate = computed(() => {
  if (!props.ticket.createdAt) return "–";
  const d = new Date(props.ticket.createdAt);
  return d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
});
</script>

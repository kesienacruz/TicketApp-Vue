<template>
  <span class="inline-flex items-center rounded-pill px-2 py-1 text-[12px] leading-[16px] font-medium text-white" :class="badgeClass">
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ status: { type: String, required: true } });
const badgeClass = computed(() => {
  if (props.status === "open") return "bg-green-600";
  if (props.status === "in_progress") return "bg-amber-500";
  if (props.status === "closed") return "bg-gray-400";
  return "bg-gray-400";
});
</script>

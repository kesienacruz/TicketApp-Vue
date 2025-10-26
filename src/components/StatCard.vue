<template>
  <div class="card p-4">
    <p class="text-body-sm text-text-dim">{{ label }}</p>
    <p class="text-display-md text-text font-semibold">{{ value }}</p>
    <p class="text-body-xs text-text-dim text-[12px] leading-[16px]">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  hint: String,
});
</script>

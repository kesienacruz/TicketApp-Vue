<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40" role="dialog" aria-modal="true" aria-labelledby="confirm-delete-title">
    <div ref="panel" class="card w-full max-w-sm p-6 space-y-6 bg-surface">
      <div class="space-y-2">
        <h2 id="confirm-delete-title" class="text-display-md font-semibold text-text">
          Delete ticket?
        </h2>
        <p class="text-body-sm text-text-dim">
          “{{ ticketTitle }}” will be permanently removed.
        </p>
        <p class="text-body-xs text-text-dim text-[12px] leading-[16px]" aria-live="assertive" role="alert">
          This action cannot be undone.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button ref="confirmBtn" :disabled="submitting" @click="confirm" class="rounded-pill px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-500" :class="submitting ? 'bg-danger-text/70 text-white cursor-not-allowed' : 'bg-danger-text text-white hover:opacity-90'">
          {{ submitting ? "Deleting..." : "Confirm delete" }}
        </button>

        <button :disabled="submitting" @click="onCancel" class="rounded-pill bg-surface px-4 py-2 text-sm font-medium text-text border border-surface-border hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500" :class="submitting ? 'opacity-60 cursor-not-allowed' : ''">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { MSG_DELETE_ERROR } from "../utils/constants.js";

const props = defineProps({
  ticketTitle: { type: String, required: true },
  onConfirm: { type: Function, required: true },
  onCancel: { type: Function, required: true },
});

const submitting = ref(false);
const panel = ref(null);
const confirmBtn = ref(null);

function onKeydown(e) {
  if (e.key === "Escape") {
    e.stopPropagation();
    if (!submitting.value) props.onCancel();
  }
}

function trapFocus(e) {
  if (!panel.value) return;
  if (!panel.value.contains(e.target)) {
    confirmBtn.value?.focus();
  }
}

onMounted(() => {
  confirmBtn.value?.focus();
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("focusin", trapFocus);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("focusin", trapFocus);
});

async function confirm() {
  if (submitting.value) return;
  submitting.value = true;
  const result = await props.onConfirm();
  if (!result || result.ok !== true) {
    const n = document.getElementById("toast-live-assertive");
    if (n) n.textContent = MSG_DELETE_ERROR;
  }
  submitting.value = false;
}
</script>

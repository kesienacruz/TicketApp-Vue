<template>
  <div class="card p-6 space-y-6">
    <header>
      <h2 class="text-display-md font-semibold text-text">
        {{ mode === "edit" ? "Edit Ticket" : "Create Ticket" }}
      </h2>
      <p class="text-body-sm text-text-dim">
        {{ mode === "edit" ? "Update details below" : "Fill in ticket details" }}
      </p>
    </header>

    <form class="space-y-4" @submit.prevent="submitForm">
      <div class="space-y-2">
        <label for="ticket-title" class="block text-body-sm font-medium text-text">Title</label>
        <input
          id="ticket-title"
          v-model="title"
          type="text"
          class="w-full rounded-card border border-surface-border px-3 py-2 text-body-md focus-visible:ring-2 focus-visible:ring-brand-500"
          placeholder="Enter ticket title"
        />
        <p v-if="errors.title" class="text-body-sm text-danger-text">{{ errors.title }}</p>
      </div>

      <div class="space-y-2">
        <label for="ticket-description" class="block text-body-sm font-medium text-text">Description</label>
        <textarea
          id="ticket-description"
          v-model="description"
          rows="3"
          class="w-full rounded-card border border-surface-border px-3 py-2 text-body-md focus-visible:ring-2 focus-visible:ring-brand-500"
          placeholder="Optional (max 500 chars)"
        ></textarea>
        <p v-if="errors.description" class="text-body-sm text-danger-text">{{ errors.description }}</p>
      </div>

      <div class="space-y-2">
        <label for="ticket-status" class="block text-body-sm font-medium text-text">Status</label>
        <select
          id="ticket-status"
          v-model="status"
          class="w-full rounded-card border border-surface-border px-3 py-2 text-body-md focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <option disabled value="">Select status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <p v-if="errors.status" class="text-body-sm text-danger-text">{{ errors.status }}</p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          type="submit"
          :disabled="!isValid || submitting"
          class="rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50"
        >
          {{ submitting ? "Saving..." : mode === "edit" ? "Save changes" : "Create ticket" }}
        </button>

        <button
          type="button"
          @click="onCancel"
          :disabled="submitting"
          class="rounded-pill border border-surface-border bg-surface px-4 py-2 text-sm font-medium text-text hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { ALLOWED_STATUS } from "../utils/constants.js";

const props = defineProps({
  mode: { type: String, required: true }, // "create" | "edit"
  initialTicket: { type: Object, default: null },
  onSave: { type: Function, required: true },
  onCancel: { type: Function, required: true },
});

const title = ref(props.initialTicket?.title || "");
const description = ref(props.initialTicket?.description || "");
const status = ref(props.initialTicket?.status || "open");
const submitting = ref(false);
const errors = reactive({ title: "", status: "", description: "" });

watch(
  () => props.initialTicket,
  (t) => {
    if (t) {
      title.value = t.title || "";
      description.value = t.description || "";
      status.value = t.status || "open";
    } else {
      title.value = "";
      description.value = "";
      status.value = "open";
    }
  },
  { immediate: true }
);

const isValid = computed(() => {
  return title.value.trim() && ALLOWED_STATUS.includes(status.value);
});

function validate() {
  errors.title = title.value.trim() ? "" : "Title is required.";
  errors.status = ALLOWED_STATUS.includes(status.value)
    ? ""
    : "Status must be valid.";
  errors.description =
    description.value.length > 500 ? "Max 500 characters allowed." : "";
}

async function submitForm() {
  validate();
  if (!isValid.value) return;
  submitting.value = true;
  try {
    await props.onSave({
      id: props.initialTicket?.id,
      title: title.value.trim(),
      description: description.value.trim(),
      status: status.value,
    });
  } catch {
    const n = document.getElementById("toast-live-assertive");
    if (n) n.textContent = "Failed to save ticket. Please retry.";
  } finally {
    submitting.value = false;
  }
}
</script>

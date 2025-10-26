<template>
  <main class="min-h-screen flex flex-col bg-surface-subtle text-text">
    <Navbar />

    <div class="flex-1 flex items-center justify-center page-shell py-16">
      <div class="card w-full max-w-sm p-6 space-y-6">
        <div>
          <h1 class="text-display-md text-text font-semibold">Log in</h1>
          <p class="text-body-sm text-text-dim">Use your email and password.</p>
        </div>

        <div v-if="topLevelMessage" class="rounded-card border border-danger-border bg-danger-bg px-3 py-2 text-danger-text text-body-sm" role="alert" aria-live="assertive">
          {{ topLevelMessage }}
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <label class="block text-body-sm font-medium text-text" for="email">Email</label>
            <input id="email" v-model="email" class="w-full rounded-card border border-surface-border bg-surface px-3 py-2 text-body-md text-text focus-visible:ring-brand-500" type="email" placeholder="you@example.com" />
            <p class="text-body-sm text-danger-text" role="alert">{{ errors.email || fieldServerError('email') }}</p>
          </div>

          <div class="space-y-2">
            <label class="block text-body-sm font-medium text-text" for="password">Password</label>
            <input id="password" v-model="password" class="w-full rounded-card border border-surface-border bg-surface px-3 py-2 text-body-md text-text focus-visible:ring-brand-500" type="password" placeholder="••••••••" />
            <p class="text-body-sm text-danger-text" role="alert">{{ errors.password || fieldServerError('password') }}</p>
          </div>

          <button type="submit" class="w-full rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500">
            Sign in
          </button>
        </form>

        <div class="text-center text-body-sm text-text-dim">
          No account?
          <RouterLink class="text-brand-600 hover:text-brand-700 font-medium focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm" to="/auth/signup">
            Create one
          </RouterLink>
        </div>

        <div class="text-center text-body-xs text-text-dim text-[12px] leading-[16px]">
          Test login: test@ticketapp.test / password123
        </div>
      </div>
    </div>

    <footer class="border-t border-surface-border bg-surface py-4 text-center text-body-xs text-text-dim">
      <div class="page-shell">© {{ year }} TicketApp — All rights reserved.</div>
    </footer>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import { isAuthError, isValidationError } from "../utils/errors.js";
import Navbar from "../components/Navbar.vue";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const serverErr = ref(null);

const errors = reactive({ email: "", password: "" });
const year = new Date().getFullYear();

function validateFields() {
  errors.email = "";
  errors.password = "";
  if (!email.value.trim()) errors.email = "Email is required.";
  if (!password.value) errors.password = "Password is required.";
}

function fieldServerError(name) {
  return serverErr.value?.details?.fields?.[name] || "";
}

const topLevelMessage = computed(() => {
  if (serverErr.value && (isAuthError(serverErr.value) || isValidationError(serverErr.value))) {
    return serverErr.value.message;
  }
  return null;
});

async function handleSubmit() {
  validateFields();
  if (errors.email || errors.password) return;
  serverErr.value = null;
  const result = await auth.doLogin({ email: email.value.trim(), password: password.value });
  if (!result.ok) {
    serverErr.value = result.error;
    return;
  }
  router.push("/dashboard");
}
</script>

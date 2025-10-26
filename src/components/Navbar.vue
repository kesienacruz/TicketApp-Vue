<template>
  <nav class="bg-surface border-b border-surface-border h-header flex items-center" role="navigation" aria-label="Main navigation">
    <div class="page-shell flex items-center justify-between w-full">
      <RouterLink to="/" class="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm">
        <div class="h-8 w-8 flex items-center justify-center rounded-card bg-brand-600 text-white text-[14px] font-semibold leading-none shadow-card" aria-hidden="true">
          T
        </div>
        <span class="text-text text-base font-semibold leading-none">TicketApp</span>
      </RouterLink>

      <div class="flex items-center gap-4 text-sm">
        <template v-if="auth.user">
          <RouterLink to="/dashboard" class="text-text-dim hover:text-text focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm">Dashboard</RouterLink>
          <RouterLink to="/tickets" class="text-text-dim hover:text-text focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm">Tickets</RouterLink>
          <span class="hidden sm:inline text-text-dim">{{ auth.user.email }}</span>
          <button @click="auth.doLogout" class="rounded-pill bg-surface px-3 py-1 text-xs font-medium text-text border border-surface-border hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/auth/login" class="text-text-dim hover:text-text focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm">Login</RouterLink>
          <RouterLink to="/auth/signup" class="rounded-pill bg-brand-600 px-4 py-2 text-white text-xs font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500">Get Started</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/auth.js";
const auth = useAuthStore();
</script>

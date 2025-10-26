<template>
  <main class="min-h-screen flex flex-col bg-white text-gray-900">
    <Navbar />

    <!-- HERO -->
    <section class="relative flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28 bg-gradient-to-b from-blue-100 to-white overflow-hidden">
      <!-- decorative circle -->
      <div class="absolute top-[-50px] right-[-50px] w-48 h-48 sm:w-64 sm:h-64 bg-blue-300 rounded-full opacity-40 blur-xl mix-blend-multiply" aria-hidden="true"></div>

      <div class="relative z-10 max-w-2xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-brand-700">
          Simplify Your Support Workflow
        </h1>
        <p class="text-lg text-gray-700 mb-8">
          Track, assign, and resolve tickets seamlessly — all in one clean interface.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/auth/signup" class="bg-brand-600 text-white px-6 py-3 rounded-pill text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500">
            Get Started
          </RouterLink>
          <RouterLink to="/auth/login" class="border border-brand-600 text-brand-700 px-6 py-3 rounded-pill text-sm font-medium hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-500">
            Login
          </RouterLink>
        </div>

        <div class="text-[12px] leading-[16px] text-gray-500 mt-4">
          Test login: test@ticketapp.test / password123
        </div>
      </div>

      <!-- wavy svg at bottom edge -->
      <svg class="absolute bottom-0 left-0 w-full h-40 sm:h-56" viewBox="0 0 1440 320" aria-hidden="true">
        <path fill="#2563eb" fill-opacity="1" d="M0,160L60,149.3C120,139,240,117,360,133.3C480,149,600,203,720,224C840,245,960,235,1080,197.3C1200,160,1320,96,1380,64L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </section>

    <!-- Feature cards -->
    <section class="max-w-[1440px] mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="p-6 bg-white shadow-md rounded-card">
        <h2 class="text-xl font-semibold text-brand-700 mb-2">Manage Tickets</h2>
        <p class="text-gray-600">Create, edit, and close tickets efficiently with built-in validation.</p>
      </div>
      <div class="p-6 bg-white shadow-md rounded-card">
        <h2 class="text-xl font-semibold text-brand-700 mb-2">Dashboard Overview</h2>
        <p class="text-gray-600">Visualize open, in-progress, and closed tickets at a glance.</p>
      </div>
      <div class="p-6 bg-white shadow-md rounded-card">
        <h2 class="text-xl font-semibold text-brand-700 mb-2">Secure Access</h2>
        <p class="text-gray-600">Protected routes with simulated authentication for real-world testing.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-600">
      © {{ year }} TicketApp — All rights reserved.
    </footer>
  </main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
const year = new Date().getFullYear();
</script>

<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col">
    <app-topbar class="sticky top-0"></app-topbar>
    <main class="mx-auto w-full max-w-screen-xl py-8">
      <slot />
    </main>
    <app-footer class="mt-auto"></app-footer>
  </div>
  <Toast />
  <ScrollTop />
</template>

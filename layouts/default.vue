<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col items-center">
    <app-topbar class="sticky top-0 z-10"></app-topbar>
    <main
      class="flex w-full max-w-screen-xl flex-grow justify-center gap-4 px-8 py-8">
      <Card class="h-fit w-72 flex-shrink-0 shadow-none max-md:hidden"></Card>
      <div class="flex min-w-0 flex-grow flex-col">
        <slot />
      </div>
      <Card class="h-fit w-72 flex-shrink-0 shadow-none max-lg:hidden"></Card>
    </main>
    <app-footer class="w-full"></app-footer>
  </div>
  <Toast />
  <ScrollTop />
</template>

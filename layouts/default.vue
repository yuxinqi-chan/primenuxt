<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col items-center">
    <app-topbar class="sticky top-0 z-10"></app-topbar>
    <main class="flex w-full max-w-[1500px] flex-grow justify-center px-8 py-8">
      <Card
        class="sticky top-[6rem] mr-8 h-fit w-80 flex-shrink-0 shadow-none max-lg:hidden"></Card>
      <div class="flex min-w-0 flex-grow flex-col">
        <slot />
      </div>
    </main>
    <app-footer class="w-full"></app-footer>
  </div>
  <Toast />
  <ScrollTop />
</template>

<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col items-center">
    <app-topbar class="sticky top-0 z-10"></app-topbar>
    <main
      class="flex w-full max-w-[1500px] flex-grow justify-center gap-4 px-8 py-8">
      <div class="w-1/4 shrink-0 max-lg:hidden">
        <ViewerInfo class="shadow-none"></ViewerInfo>
      </div>
      <div class="w-1/2 flex-grow">
        <slot />
      </div>
      <div class="w-1/4 shrink-0 max-xl:hidden">
        <TagsCard class="shadow-none"></TagsCard>
      </div>
    </main>
    <ScrollTop />
    <app-footer class="w-full"></app-footer>
  </div>
</template>

<style scoped>
.col-span-auto {
  grid-column: auto / span auto;
}
</style>

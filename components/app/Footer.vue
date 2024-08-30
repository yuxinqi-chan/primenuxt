<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    class="flex items-center justify-center gap-2 border-t border-solid border-[var(--p-content-border-color)] py-4"
    :class="props.class">
    SAKAI by
    <a
      href="https://primevue.org"
      target="_blank"
      rel="noopener noreferrer"
      class="font-bold text-primary hover:underline">
      PrimeVue
    </a>
  </div>
</template>

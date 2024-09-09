<template>
  <span>{{ count }}</span>
</template>

<script lang="ts" setup>
const route = useRoute();
const { $KV } = useNuxtApp();
const PREFIX = "viewer-count";
const count = Number((await $KV?.get(`${PREFIX}:${route.path}`)) || 0);
await $KV?.put(`${PREFIX}:${route.path}`, String(count + 1));
</script>

<style></style>

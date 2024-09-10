<template>
  <span>{{ count }}</span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  path: string;
}>();
console.log(props.path);
const { $KV } = useNuxtApp();
const PREFIX = "viewer-count";
const count = Number((await $KV?.get(`${PREFIX}:${props.path}`)) || 0);
await $KV?.put(`${PREFIX}:${props.path}`, String(count + 1));
</script>

<style></style>

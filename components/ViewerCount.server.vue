<template>
  <span>{{ count }}</span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  path: string;
}>();
const event = useRequestEvent();
const kv = event?.context.cloudflare.env.KV as KVNamespace;
const PREFIX = "viewer-count";
const count = Number((await kv?.get(`${PREFIX}:${props.path}`)) || 0);
await kv?.put(`${PREFIX}:${props.path}`, String(count + 1));
</script>

<style></style>

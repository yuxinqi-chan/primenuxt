<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toast />
  </NuxtLayout>
</template>
<script setup>
// Initialize stores
useSessionStore();
useCloudflareStore();
useLayoutStore();
</script>

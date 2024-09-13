<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
useHead({
  title: t("dashboard"),
});
</script>
<template>
  <div></div>
</template>

<style></style>

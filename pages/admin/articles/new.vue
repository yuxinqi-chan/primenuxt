<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const article = reactive({
  title: "",
  content: "",
  tags: [],
  published: false,
});
</script>

<template>
  <ArticleItemEditor :model-value="article" />
</template>

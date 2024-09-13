<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
useHead({
  title: t("createArticle"),
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

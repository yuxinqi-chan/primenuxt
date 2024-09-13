<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
const route = useRoute();
const id = route.params.id;
useHead({
  title: `${t("editArticle")}#${id}`,
});

const { data: article } = await useFetch(`/api/articles/${id}`, {
  default: () => undefined,
});
</script>

<template>
  <ArticleItemEditor v-if="article" :model-value="article" />
</template>

<style scoped></style>

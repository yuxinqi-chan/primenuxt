<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const id = route.params.id;

const { data: article } = await useFetch(`/api/articles/${id}`, {
  default: () => undefined,
});
</script>

<template>
  <ArticleItemEditor v-if="article" :model-value="article" />
</template>

<style scoped></style>

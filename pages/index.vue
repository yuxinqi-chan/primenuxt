<template>
  <div class="flex flex-col gap-4">
    <ArticleCardItem
      v-animateonscroll="{
        enterClass: 'animate-scalein',
        leaveClass: 'animate-fadeout',
      }"
      v-for="article in articles"
      :key="article.id"
      :article="article" />
  </div>
</template>

<script lang="ts" setup>
const { data: articles } = await useFetch("/api/articles", {
  query: {
    sort: "desc",
  },
  default: () => [],
});
</script>

<style></style>

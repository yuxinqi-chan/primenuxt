<template>
  <div v-auto-animate class="flex min-w-0 flex-grow flex-col gap-4">
    <ArticleItemCard
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
const { t } = useI18n();
useHead({
  title: t("home"),
});
const { data: articles } = await useFetch("/api/articles", {
  query: {
    sort: "desc",
    published: true,
  },
  default: () => [],
});
</script>

<style></style>

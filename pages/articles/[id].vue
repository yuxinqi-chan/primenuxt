<script lang="ts" setup>
const { id } = useRoute().params;
const { data: article } = await useFetch(`/api/articles/${id}`);
</script>
<template>
  <Card v-if="article">
    <template #title>
      <h1 class="text-2xl font-bold">
        {{ article.title }}
      </h1>
    </template>
    <template #content>
      <div class="ql-snow">
        <div class="ql-editor" v-html="article.content"></div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="tag in article.articleTags"
          :key="tag.tag.name"
          :value="tag.tag.name"
          severity="info"
          rounded />
      </div>
    </template>
  </Card>
</template>
<style></style>

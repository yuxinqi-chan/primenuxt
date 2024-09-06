<script lang="ts" setup>
const { article } = defineProps<{
  article: {
    id: number;
    title: string;
    content: string;
    tags: {
      name: string;
    }[];
  };
}>();
const summary = computed(() => {
  return article.content.replace(/<[^>]*>/g, "").substring(0, 100);
});
</script>
<template>
  <NuxtLink :to="`/articles/${article.id}`">
    <Card>
      <template #title>{{ article.title }}</template>
      <template #content>
        <p>{{ summary }}</p>
      </template>
      <template #footer>
        <div class="flex flex-wrap gap-2">
          <Tag
            v-for="tag in article.tags"
            :key="tag.name"
            :value="tag.name"
            severity="info"
            rounded />
        </div>
      </template>
    </Card>
  </NuxtLink>
</template>

<style></style>

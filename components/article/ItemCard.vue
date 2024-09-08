<script lang="ts" setup>
const { article } = defineProps<{
  article: {
    id: number;
    image?: string | null;
    title: string;
    content: string;
    tags: {
      name: string;
    }[];
  };
}>();
const summary = computed(() => {
  return article.content.replace(/<[^>]*>/g, "");
});
</script>
<template>
  <Card>
    <template #header v-if="article.image">
      <NuxtLink :to="`/articles/${article.id}`">
        <img
          :src="article.image"
          :alt="article.title"
          class="h-72 w-full rounded-lg object-cover transition-all duration-300 hover:scale-105" />
      </NuxtLink>
    </template>
    <template #title>
      <NuxtLink
        class="transition-all duration-300 hover:text-primary"
        :to="`/articles/${article.id}`">
        {{ article.title }}
      </NuxtLink>
    </template>
    <template #content>
      <NuxtLink :to="`/articles/${article.id}`">
        <p class="line-clamp-3">{{ summary }}</p>
      </NuxtLink>
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
</template>

<style></style>

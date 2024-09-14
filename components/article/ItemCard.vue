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
    createdAt: Date | string | number;
    updatedAt: Date | string | number;
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
        <h1>{{ article.title }}</h1>
      </NuxtLink>
    </template>
    <template #subtitle>
      <div class="flex items-center gap-1 text-sm">
        <i class="pi pi-calendar"></i>
        <DateTime :date="article.createdAt" format="LL" />
      </div>
    </template>
    <template #content>
      <NuxtLink :to="`/articles/${article.id}`">
        <p class="line-clamp-3">{{ summary }}</p>
      </NuxtLink>
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          class="cursor-pointer transition-all duration-300 hover:scale-105"
          v-for="tag in article.tags"
          :key="tag.name"
          :to="`/tags/${tag.name}`">
          <Tag :value="tag.name" severity="info" />
        </NuxtLink>
      </div>
    </template>
  </Card>
</template>

<style></style>

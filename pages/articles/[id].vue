<script lang="ts" setup>
const { id } = useRoute().params;
const { data: article } = await useFetch(`/api/articles/${id}`);
const wordCount = computed(() => {
  return article.value?.content.replace(/<[^>]*>?/g, "").length;
});
</script>
<template>
  <Card v-if="article">
    <template #header v-if="article.image">
      <img
        :src="article.image"
        :alt="article.title"
        class="h-72 w-full rounded-lg object-cover transition-all duration-300 hover:scale-105" />
    </template>
    <template #title>
      <h1 class="text-2xl font-bold">
        {{ article.title }}
      </h1>
    </template>
    <template #subtitle>
      <div class="flex flex-wrap items-center gap-2 text-sm">
        <div class="flex items-center gap-1">
          <i class="pi pi-calendar text-sm"></i>
          <time :datetime="dayjs(article?.createdAt).utc().toString()">
            {{ dayjs(article?.createdAt).locale("zh-cn").format("LL LTS") }}
          </time>
        </div>
        <div class="flex items-center gap-1">
          <i class="pi pi-eye text-sm"></i>
          <ViewerCount :path="$route.path" />
        </div>
        <div class="flex items-center gap-1">
          <i class="pi pi-pencil text-sm"></i>
          <span>{{ wordCount }}字</span>
        </div>
        <div class="flex flex-wrap gap-1">
          <Tag
            v-for="tag in article.tags"
            :key="tag.name"
            :value="tag.name"
            severity="info" />
        </div>
      </div>
    </template>
    <template #content>
      <div class="ql-snow">
        <div class="ql-editor" v-html="article.content"></div>
      </div>
    </template>
  </Card>
</template>
<style></style>

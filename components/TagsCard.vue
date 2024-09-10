<template>
  <Card>
    <template #title>标签云</template>
    <template #content>
      <div class="flex flex-wrap gap-2 after:flex-grow-[10]">
        <Tag
          class="flex-grow"
          v-for="tag in sortedTags"
          :key="tag.name"
          :value="tag.name"
          severity="info" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
const { data: tags } = await useFetch("/api/tags");
const sortedTags = tags.value?.sort(
  (a, b) => b._count.articles - a._count.articles,
);
</script>

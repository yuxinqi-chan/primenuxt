<template>
  <Card>
    <template #title>{{ $t("tagCloud") }}</template>
    <template #content>
      <div class="flex flex-wrap gap-2 after:flex-grow-[10]">
        <NuxtLink
          class="cursor-pointer transition-all duration-300 hover:scale-105"
          v-for="tag in sortedTags"
          :key="tag.name"
          :to="`/tags/${tag.name}`">
          <Tag
            :value="tag.name"
            severity="secondary"
            v-tooltip.top="
              `${$t('tagHasArticles', { count: tag._count.articles })}`
            " />
        </NuxtLink>
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

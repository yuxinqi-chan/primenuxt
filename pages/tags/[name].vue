<script lang="ts" setup>
import { NuxtLink } from "#components";
import type { MenuItem } from "primevue/menuitem";

const { t } = useI18n();
const route = useRoute();
const { name } = route.params;
useHead({
  title: `${t("tag")}: ${name}`,
});
const { data: articles } = await useFetch("/api/articles", {
  query: {
    sort: "desc",
    published: true,
    tag: name,
  },
  default: () => [],
});
const home = ref({
  icon: "pi pi-home",
  label: t("home"),
  route: "/",
});
const items = ref<MenuItem[]>([
  {
    icon: "pi pi-tag",
    label: String(name),
    route: route.path,
    disabled: true,
  },
]);
</script>
<template>
  <div v-auto-animate class="flex min-w-0 flex-grow flex-col gap-4">
    <Breadcrumb class="overflow-hidden rounded-xl" :home="home" :model="items">
      <template #item="{ item, props }">
        <Button
          :icon="item.icon"
          :disabled="Boolean(item.disabled)"
          text
          :as="NuxtLink"
          :to="item.route"
          :severity="item.disabled ? 'primary' : 'secondary'"
          :label="String(item.label)"></Button>
      </template>
    </Breadcrumb>
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

<style></style>

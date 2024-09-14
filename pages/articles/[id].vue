<script lang="ts" setup>
import { NuxtLink } from "#components";

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const { protocol, host } = useCloudflareStore();
const { id } = route.params;
const { data: article } = await useFetch(`/api/articles/${id}`);
useHead({
  title: article.value?.title,
});
const wordCount = computed(() => {
  return article.value?.content.replace(/<[^>]*>?/g, "").length;
});
const home = ref({
  icon: "pi pi-home",
  label: t("home"),
  route: "/",
});
const items = ref([
  {
    icon: "pi pi-pencil",
    label: t("Article"),
    route: `/articles/${article.value?.id}`,
    disabled: true,
  },
]);
const articleUrl = ref(`${protocol}//${host}${route.path}`);
const imageUrl = article.value?.image?.startsWith("http")
  ? article.value.image
  : `${protocol}//${host}${article.value?.image}`;
const copyToClipboard = () => {
  navigator.clipboard.writeText(articleUrl.value);
  toast.add({
    severity: "success",
    summary: t("copySuccess"),
    detail: t("linkCopied"),
    life: 3000,
  });
};
</script>
<template>
  <div v-if="article" class="flex min-w-0 flex-grow flex-col gap-4">
    <div
      class="flex justify-between overflow-hidden rounded-xl bg-[var(--p-content-background)]">
      <Breadcrumb :home="home" :model="items">
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
      <div class="flex items-center p-3">
        <span class="mr-2">{{ t("shareTo") }}</span>
        <ButtonGroup>
          <Button
            text
            severity="secondary"
            data-sharer="weibo"
            :data-url="articleUrl"
            :data-title="article.title"
            :data-image="imageUrl">
            <Icon name="ri:weibo-fill" class="text-2xl" />
          </Button>
          <Button text severity="secondary" @click="copyToClipboard()">
            <Icon name="ri:share-forward-fill" class="text-2xl" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
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
            <i class="pi pi-clock text-sm"></i>
            <DateTime :date="article.createdAt" format="LL LTS" />
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-eye text-sm"></i>
            <ViewerCount :path="$route.path" />
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-pencil text-sm"></i>
            <span>{{ wordCount }} {{ $t("words") }}</span>
          </div>
          <NuxtLink
            class="cursor-pointer transition-all duration-300 hover:scale-105"
            v-for="tag in article.tags"
            :key="tag.name"
            :to="`/tags/${tag.name}`">
            <Tag :value="tag.name" severity="info" />
          </NuxtLink>
        </div>
      </template>
      <template #content>
        <div class="ql-snow" style="position: relative">
          <div class="ql-editor" v-html="article.content"></div>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2 text-sm">
          <div class="flex items-center gap-1">
            <i class="pi pi-clock text-sm"></i>
            <span>{{ $t("lastUpdateAt") }}</span>
            <DateTime :date="article.updatedAt" format="LL LTS" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<style>
@import "quill/dist/quill.core.css";
@import "quill/dist/quill.snow.css";
</style>

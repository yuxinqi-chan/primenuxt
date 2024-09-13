<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { useToast } from "primevue/usetoast";
import { NuxtLink } from "#components";
import type { SerializeObject } from "nitropack";
import type { Prisma } from "@prisma/client";

type ArticleGet = SerializeObject<Prisma.ArticleGetPayload<{}>>;

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
useHead({
  title: t("manageArticles"),
});
const toast = useToast();
const { data: articles, refresh } = await useFetch("/api/articles", {
  default: () => [],
});
const deletingArticle = ref<ArticleGet>();
const deletingDialog = useComputedBoolean(deletingArticle);
const selectedArticles = ref<ArticleGet[]>([]);
const deleteArticlesDialog = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

async function deleteArticle() {
  if (deletingArticle.value) {
    await $fetch(`/api/articles/${deletingArticle.value.id}`, {
      method: "DELETE",
    });
    refresh();
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Article Deleted",
      life: 3000,
    });
    deletingArticle.value = undefined;
  }
}

function deleteSelectedArticles() {
  articles.value = articles.value.filter(
    (val) => !selectedArticles.value.includes(val),
  );
  deleteArticlesDialog.value = false;
  selectedArticles.value = [];
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Products Deleted",
    life: 3000,
  });
}
function updatePubliched(id: number, published: boolean) {
  return $fetch(`/api/articles/${id}`, {
    method: "PATCH",
    body: {
      published: published,
    },
  });
}
const publishedMutation = useMutation({
  mutationFn: (article: ArticleGet) =>
    updatePubliched(article.id, article.published),
});
</script>

<template>
  <Card class="shadow-none">
    <template #content>
      <Toolbar class="mb-6">
        <template #start>
          <Button
            :label="$t('create')"
            icon="pi pi-plus"
            severity="secondary"
            class="mr-2"
            :as="NuxtLink"
            to="/admin/articles/new" />
          <Button
            :label="$t('delete')"
            icon="pi pi-trash"
            severity="secondary"
            @click="deleteArticlesDialog = true"
            :disabled="!selectedArticles.length" />
        </template>
        <template #end>
          <Button
            :label="$t('export')"
            icon="pi pi-upload"
            severity="secondary" />
        </template>
      </Toolbar>
      <DataTable
        v-model:selection="selectedArticles"
        :value="articles"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="m-0">{{ $t("manageArticles") }}</h4>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                :placeholder="$t('searchEllipsis')" />
            </IconField>
          </div>
        </template>
        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"></Column>
        <Column field="id" header="Id" style="width: 5rem" sortable></Column>
        <Column
          field="title"
          :header="$t('title')"
          style="min-width: 12rem"></Column>
        <Column :header="$t('image')">
          <template #body="{ data }: { data: ArticleGet }">
            <img :src="data.image || ''" class="rounded" style="width: 64px" />
          </template>
        </Column>
        <Column
          field="published"
          :header="$t('publish')"
          sortable
          style="min-width: 12rem">
          <template #body="{ data }: { data: ArticleGet }">
            <ToggleSwitch
              v-model="data.published"
              @change="publishedMutation.mutate(data)" />
          </template>
        </Column>
        <Column
          :header="$t('action')"
          :exportable="false"
          style="min-width: 12rem">
          <template #body="{ data }: { data: ArticleGet }">
            <NuxtLink
              class="p-button p-component p-button-icon-only p-button-rounded p-button-outlined mr-2"
              :to="`/admin/articles/${data.id}`">
              <span class="p-button-icon pi pi-pencil"></span>
            </NuxtLink>
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="deletingArticle = data" />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="deletingDialog"
        :style="{ width: '450px' }"
        :header="$t('confirm')"
        :modal="true">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="deletingArticle">
            {{ $t("sureToDelete") }}
            <b>{{ deletingArticle.title }}</b>
            {{ $t("questionMark") }}
          </span>
        </div>
        <template #footer>
          <Button
            :label="$t('no')"
            icon="pi pi-times"
            text
            @click="deletingArticle = undefined" />
          <Button
            :label="$t('yes')"
            icon="pi pi-check"
            @click="deleteArticle" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="deleteArticlesDialog"
        :style="{ width: '450px' }"
        :header="$t('confirm')"
        :modal="true">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span>
            {{ $t("sureToDeleteSelected") }} {{ selectedArticles.length }}
            {{ $t("articles") }}{{ $t("questionMark") }}
          </span>
        </div>
        <template #footer>
          <Button
            :label="$t('no')"
            icon="pi pi-times"
            text
            @click="deleteArticlesDialog = false" />
          <Button
            :label="$t('yes')"
            icon="pi pi-check"
            text
            @click="deleteSelectedArticles" />
        </template>
      </Dialog>
    </template>
  </Card>
</template>

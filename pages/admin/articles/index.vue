<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { useToast } from "primevue/usetoast";
import { NuxtLink } from "#components";
import type { SerializeObject } from "nitropack";
import type { Prisma } from "@prisma/client";

type ArticleGet = SerializeObject<Prisma.ArticleGetPayload<{}>>;
type ArticleCreate = Prisma.ArticleCreateInput;

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
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
const submitted = ref(false);

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

function getPublicshedValue(published: boolean) {
  return published ? "Published" : "Unpublished";
}
function getPublicshedLabel(published: boolean) {
  return published ? "success" : "danger";
}
</script>

<template>
  <Card class="shadow-none">
    <template #content>
      <Toolbar class="mb-6">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            severity="secondary"
            class="mr-2"
            :as="NuxtLink"
            to="/admin/articles/new" />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="secondary"
            @click="deleteArticlesDialog = true"
            :disabled="!selectedArticles.length" />
        </template>
        <template #end>
          <Button label="Export" icon="pi pi-upload" severity="secondary" />
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
            <h4 class="m-0">Manage Products</h4>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..." />
            </IconField>
          </div>
        </template>
        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"></Column>
        <Column field="id" header="Id" style="width: 5rem" sortable></Column>
        <Column field="title" header="Title" style="min-width: 12rem"></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
              :alt="slotProps.data.image"
              class="rounded"
              style="width: 64px" />
          </template>
        </Column>
        <Column
          field="inventoryStatus"
          header="Status"
          sortable
          style="min-width: 12rem">
          <template #body="{ data }: { data: ArticleGet }">
            <Tag
              :value="getPublicshedValue(data.published)"
              :severity="getPublicshedLabel(data.published)" />
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 12rem">
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
    </template>
  </Card>
  <Dialog
    v-model:visible="deletingDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="deletingArticle">
        Are you sure you want to delete
        <b>{{ deletingArticle.title }}</b>
        ?
      </span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        text
        @click="deletingArticle = undefined" />
      <Button label="Yes" icon="pi pi-check" @click="deleteArticle" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteArticlesDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span>Are you sure you want to delete the selected articles?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        text
        @click="deleteArticlesDialog = false" />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
        @click="deleteSelectedArticles" />
    </template>
  </Dialog>
</template>

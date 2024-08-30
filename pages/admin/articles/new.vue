<script setup lang="ts">
import { FetchError } from "ofetch";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const router = useRouter();
const toast = useToast();

const article = reactive({
  title: "",
  content: "",
  published: false,
});

async function createArticle() {
  try {
    await $fetch(`/api/articles`, {
      method: "POST",
      body: article,
    });
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Article Created",
      life: 3000,
    });
    router.back();
  } catch (error) {
    if (error instanceof FetchError) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.statusMessage,
        life: 3000,
      });
    }
  }
}
</script>

<template>
  <div v-if="article" class="flex flex-col gap-4">
    <div class="flex justify-start">
      <Button
        link
        label="Back"
        icon="pi pi-arrow-left"
        @click="$router.back()" />
    </div>
    <div>
      <label for="title" class="mb-3 block font-bold">Title</label>
      <InputText
        id="title"
        v-model.trim="article.title"
        required="true"
        autofocus
        :invalid="!article.title"
        fluid />
      <small v-if="!article.title" class="text-red-500">
        Name is required.
      </small>
    </div>
    <TextEditor v-model="article.content" editorStyle="height: 320px" />
    <div class="flex justify-end gap-4">
      <label for="published" class="block font-bold">Published</label>
      <ToggleSwitch v-model="article.published" />
      <Button label="Cancel" icon="pi pi-times" text @click="$router.back()" />
      <Button label="Save" icon="pi pi-check" @click="createArticle" />
    </div>
  </div>
</template>

<style scoped></style>

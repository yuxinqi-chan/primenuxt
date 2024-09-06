<script setup lang="ts">
import { FetchError } from "ofetch";
import type { SerializeObject } from "nitropack";
import type { Prisma } from "@prisma/client";
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";

type TagGet = SerializeObject<Prisma.TagGetPayload<{}>>;

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const router = useRouter();
const toast = useToast();

const article = reactive({
  title: "",
  content: "",
  tags: [] as TagGet[],
  published: false,
});

const { data: tags } = await useFetch<TagGet[]>(`/api/tags`, {
  default: () => [],
});
const enteredTag = ref<TagGet | string>();
const filteredTags = ref<TagGet[]>([]);

function search(event: AutoCompleteCompleteEvent) {
  filteredTags.value = tags.value.filter((tag) =>
    tag.name.toLowerCase().includes(event.query.toLowerCase()),
  );
}
async function addTag() {
  if (typeof enteredTag.value === "string") {
    const tag = tags.value.find((tag) => tag.name === enteredTag.value);
    if (!tag) {
      const tag = await $fetch("/api/tags", {
        method: "POST",
        body: {
          name: enteredTag.value,
        },
      });
      tags.value.push(tag);
      enteredTag.value = tag;
    } else {
      enteredTag.value = tag;
    }
  }
  if (typeof enteredTag.value === "object") {
    article.tags.push(enteredTag.value);
    enteredTag.value = undefined;
  }
}

async function removeTag(tag: TagGet) {
  article.tags = article.tags.filter((t) => t.id !== tag.id);
}

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
    <div>
      <label for="tags" class="mb-3 block font-bold">Tags</label>
      <div class="flex flex-wrap gap-2">
        <Chip
          v-for="tag in article.tags"
          :key="tag.id"
          :label="tag.name"
          removable
          @remove="removeTag(tag)" />
        <InputGroup class="w-60">
          <AutoComplete
            v-model="enteredTag"
            optionLabel="name"
            :suggestions="filteredTags"
            @complete="search"
            @keyup.enter="addTag" />
          <Button icon="pi pi-plus" @click="addTag" />
        </InputGroup>
      </div>
    </div>
    <Editor v-model="article.content" editorStyle="height: 320px" />
    <div class="flex justify-end gap-4">
      <label for="published" class="block font-bold">Published</label>
      <ToggleSwitch v-model="article.published" />
      <Button label="Cancel" icon="pi pi-times" text @click="$router.back()" />
      <Button label="Save" icon="pi pi-check" @click="createArticle" />
    </div>
  </div>
</template>

<style scoped></style>

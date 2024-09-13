<script setup lang="ts">
import { FetchError } from "ofetch";
import type { SerializeObject } from "nitropack";
import type { Prisma } from "@prisma/client";
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";
import type { ArticleImageUpload } from "#components";

type TagGet = SerializeObject<Prisma.TagGetPayload<{}>>;
type FileWithObjectURL = File & { objectURL: string };

const router = useRouter();
const toast = useToast();
const imageUpload = ref<InstanceType<typeof ArticleImageUpload>>();
const uploadFiles = computed(() => imageUpload.value?.fileUpload.files);
let article = defineModel<{
  id?: number;
  title: string;
  image?: string | null;
  content: string;
  tags: {
    name: string;
    id: number;
  }[];
  published: boolean;
}>({
  required: true,
});

const { data: tags } = await useFetch<TagGet[]>(`/api/tags`, {
  default: () => [],
});
const enteredTag = ref<TagGet | string>();
const filteredTags = ref<TagGet[]>([]);
function searchTag(event: AutoCompleteCompleteEvent) {
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
    article.value.tags.push(enteredTag.value);
    enteredTag.value = undefined;
  }
}

async function removeTag(tag: TagGet) {
  article.value.tags = article.value.tags.filter((t) => t.id !== tag.id);
}

async function saveArticle() {
  try {
    const formData = new FormData();
    formData.append("title", article.value.title);
    formData.append("content", article.value.content);
    article.value.image && formData.append("image", article.value.image);
    formData.append("published", String(article.value.published));
    formData.append("tags", JSON.stringify(article.value.tags));
    for (const file of uploadFiles.value) {
      formData.append(file.objectURL, file);
    }
    if (article.value.id) {
      await $fetch(`/api/articles/${article.value.id}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      await $fetch(`/api/articles`, {
        method: "POST",
        body: formData,
      });
    }
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Article Updated",
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

async function editorLoad({ instance: quill }: any) {
  const Delta = quill.constructor.import("delta");
  quill.getModule("toolbar").addHandler("image", () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      if (!input.files) {
        return;
      }
      const images = Array.from(input.files).map((file) => {
        const fileWithObjectURL = file as FileWithObjectURL;
        fileWithObjectURL.objectURL = URL.createObjectURL(file);
        return fileWithObjectURL;
      });
      const range = quill.getSelection();
      const update = images.reduce((delta, image) => {
        return delta.insert({ image: image.objectURL });
      }, new Delta().retain(range.index).delete(range.length));
      quill.updateContents(update, "user");
      quill.setSelection(range.index + images.length, "silent");
      images.forEach((image) => {
        uploadFiles.value.push(image);
      });
    };
  });
}
</script>

<template>
  <div class="flex flex-grow flex-col gap-4">
    <div class="flex justify-start">
      <Button
        link
        :label="$t('back')"
        icon="pi pi-arrow-left"
        @click="$router.back()" />
    </div>
    <Card class="shadow-none">
      <template #title>{{ $t("title") }}</template>
      <template #content>
        <InputText
          id="title"
          v-model.trim="article.title"
          required="true"
          autofocus
          :invalid="!article.title"
          fluid />
      </template>
    </Card>
    <Card class="shadow-none">
      <template #title>{{ $t("tags") }}</template>
      <template #content>
        <div class="flex flex-wrap items-center gap-2">
          <Tag
            v-for="tag in article.tags"
            :key="tag.id"
            :value="tag.name"
            severity="info"
            @remove="removeTag(tag)" />
          <InputGroup class="w-60">
            <AutoComplete
              v-model="enteredTag"
              optionLabel="name"
              :suggestions="filteredTags"
              @complete="searchTag"
              @keyup.enter="addTag" />
            <Button icon="pi pi-plus" @click="addTag" />
          </InputGroup>
        </div>
      </template>
    </Card>
    <ArticleImageUpload ref="imageUpload" v-model:cover="article.image" />
    <Card class="shadow-none">
      <template #title>{{ $t("content") }}</template>
      <template #content>
        <div>
          <QuillEditor v-model="article.content" @load="editorLoad" />
        </div>
      </template>
    </Card>
    <div class="flex items-center justify-end gap-4">
      <label for="published" class="block font-bold">
        {{ $t("publish") }}
      </label>
      <ToggleSwitch v-model="article.published" />
      <Button
        :label="$t('cancel')"
        icon="pi pi-times"
        text
        @click="$router.back()" />
      <Button :label="$t('save')" icon="pi pi-check" @click="saveArticle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ofetch";
import type { SerializeObject } from "nitropack";
import type { Prisma } from "@prisma/client";
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";

function sanitize(url: string, protocols: string[]) {
  var anchor = document.createElement("a");
  anchor.href = url;

  var protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
  return protocols.indexOf(protocol) > -1;
}

type TagGet = SerializeObject<Prisma.TagGetPayload<{}>>;

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = route.params.id;

const { data: article } = await useFetch(`/api/articles/${id}`);
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
  });
}
const { data: tags } = await useFetch<TagGet[]>(`/api/tags`, {
  default: () => [],
});
const enteredTag = ref<TagGet | string>();
const filteredTags = ref<TagGet[]>([]);
const uploadFiles = reactive<Record<string, File>>({});

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
  if (typeof enteredTag.value === "object" && article.value) {
    article.value.tags.push(enteredTag.value);
    enteredTag.value = undefined;
  }
}

async function removeTag(tag: TagGet) {
  if (article.value) {
    article.value.tags = article.value.tags.filter((t) => t.id !== tag.id);
  }
}

async function editArticle() {
  if (article.value) {
    try {
      const formData = new FormData();
      formData.append("title", article.value.title);
      formData.append("content", article.value.content);
      formData.append("published", String(article.value.published));
      formData.append("tags", JSON.stringify(article.value.tags));
      for (const [key, file] of Object.entries(uploadFiles)) {
        formData.append(key, file, file.name);
      }
      await $fetch(`/api/articles/${article.value.id}`, {
        method: "PUT",
        body: formData,
      });
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
}

async function editorLoad(editor: any) {
  console.log(editor);
  const Quill = (await import("quill")).default;
  // @ts-ignore
  const Delta = Quill.import("delta");
  Quill.import("formats/image").sanitize = (url: string) => {
    return sanitize(url, ["http", "https", "data", "blob"]) ? url : "//:0";
  };
  editor.getModule("toolbar").addHandler("image", () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      if (!input.files) {
        return;
      }
      const images = Array.from(input.files).map((file) => {
        return {
          url: URL.createObjectURL(file),
          file,
        };
      });
      const range = editor.getSelection();
      // images.forEach((image) =>
      //   editor.insertEmbed(range.index, "image", image.url),
      // );
      const update = images.reduce((delta, image) => {
        return delta.insert({ image: image.url });
      }, new Delta().retain(range.index).delete(range.length));
      editor.updateContents(update, "user");
      editor.setSelection(range.index + images.length, "silent");
      images.forEach((image) => {
        Object.assign(uploadFiles, { [image.url]: image.file });
      });
    };
  });
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
    <Editor
      ref="editor"
      v-model="article.content"
      class="flex flex-col"
      @text-change="(e) => console.log(e)"
      @load="(e) => editorLoad(e.instance)" />
    <div class="flex items-center justify-end gap-4">
      <label for="published" class="block font-bold">Published</label>
      <ToggleSwitch v-model="article.published" />
      <Button label="Cancel" icon="pi pi-times" text @click="$router.back()" />
      <Button label="Save" icon="pi pi-check" @click="editArticle" />
    </div>
  </div>
</template>

<style scoped></style>

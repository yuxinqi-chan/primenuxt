<template>
  <Editor v-bind="props" @load="onLoad" @update:modelValue="onChange" />
</template>

<script setup lang="ts">
import Editor, {
  type EditorLoadEvent,
  type EditorProps,
} from "primevue/editor";

const props = defineProps<EditorProps>();

const emits = defineEmits(["update:modelValue"]);

const onLoad = ({ instance }: EditorLoadEvent) => {
  instance.setContents(
    instance.clipboard.convert({
      html: props.modelValue,
    }),
  );
};

const onChange = (v: string) => {
  emits("update:modelValue", v);
};
</script>

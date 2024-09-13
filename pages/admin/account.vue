<script lang="ts" setup>
import { FetchError } from "ofetch";
import * as yup from "yup";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const { t } = useI18n();
useHead({
  title: t("manageAccount"),
});
const session = useSessionStore();
const toast = useToast();
const validationSchema = toTypedSchema(
  yup.object({
    username: yup.string().required().min(6).default(session.user!.username),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  }),
);

const { errors, values, defineField } = useForm({
  validationSchema,
});
const username = defineField("username")[0];
const password = defineField("password")[0];
const confirmPassword = defineField("confirmPassword")[0];

const { data, execute: save } = await useAsyncData(
  async () => {
    try {
      await $fetch(`/api/users/${session.user?.id}`, {
        method: "PUT",
        body: values,
      });
      toast.add({
        severity: "success",
        summary: "Saved",
        detail: "Account has been saved",
        life: 3000,
      });
      navigateTo("/admin/account");
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          severity: "error",
          summary: "Failed to save",
          detail: error.statusMessage,
          life: 3000,
        });
      }
    }
  },
  { immediate: false },
);
</script>
<template>
  <Card v-if="session.user" class="mx-auto w-full max-w-2xl shadow-none">
    <template #title>
      <h1>{{ $t("account") }}</h1>
    </template>
    <template #content>
      <div class="flex flex-col gap-2">
        <label for="username">{{ $t("username") }}</label>
        <InputText
          id="username"
          v-model="username"
          :invalid="errors.username !== undefined" />
        <small v-if="errors.username" class="text-red-500">
          {{ errors.username }}
        </small>
        <label for="password">{{ $t("password") }}</label>
        <Password
          id="password"
          fluid
          v-model="password"
          :invalid="errors.password !== undefined" />
        <small v-if="errors.password" class="text-red-500">
          {{ errors.password }}
        </small>
        <label for="confirmPassword">{{ $t("confirmPassword") }}</label>
        <Password
          id="confirmPassword"
          fluid
          v-model="confirmPassword"
          :invalid="errors.confirmPassword !== undefined" />
        <small v-if="errors.confirmPassword" class="text-red-500">
          {{ errors.confirmPassword }}
        </small>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-end gap-4">
        <Button :label="$t('save')" @click="save()" />
      </div>
    </template>
  </Card>
</template>

<style></style>

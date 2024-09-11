<script setup lang="ts">
import Logo from "~/assets/icons/logo.svg?component";
import { FetchError } from "ofetch";

definePageMeta({
  layout: false,
  middleware: ["auth"],
});

const toast = useToast();
const session = useSessionStore();
const { data: isInitialized } = await useFetch("/api/auth/init", {
  method: "get",
  default: () => false,
});
const email = ref("");
const password = ref("");
const checked = ref(false);

const { status: initStatus, execute: initExecute } = await useAsyncData(
  async () => {
    try {
      await session.initAdmin();
      toast.add({
        severity: "success",
        summary: "Admin initialized",
        detail: "Admin has been initialized",
        life: 3000,
      });
      navigateTo("/");
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          severity: "error",
          summary: "Failed to initialize admin",
          detail: error.statusMessage,
          life: 3000,
        });
      }
    }
  },
  { immediate: false },
);
const { status: loginStatus, execute: loginExecute } = await useAsyncData(
  async () => {
    try {
      await session.login(email, password);
      toast.add({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome to PrimeLand!",
        life: 3000,
      });
      navigateTo("/");
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          severity: "error",
          summary: "Login Failed",
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
  <div
    class="flex min-h-screen min-w-[100vw] items-center justify-center overflow-hidden bg-[var(--surface-ground)]">
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--p-primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        ">
        <div
          class="w-full bg-surface-0 px-8 py-20 sm:px-20 dark:bg-surface-900"
          style="border-radius: 53px">
          <div class="mb-8 text-center">
            <Logo class="mx-auto mb-8 w-16 shrink-0" />
            <div
              class="mb-4 text-3xl font-medium text-surface-900 dark:text-surface-0">
              {{ $t("welcome") }}
            </div>
            <span class="font-medium text-muted-color">
              {{ $t("signInToContinue") }}
            </span>
          </div>

          <div>
            <label
              for="email1"
              class="mb-2 block text-xl font-medium text-surface-900 dark:text-surface-0">
              {{ $t("email") }}
            </label>
            <InputText
              id="email1"
              type="text"
              :placeholder="$t('emailAddress')"
              class="mb-8 w-full md:w-[30rem]"
              v-model="email" />

            <label
              for="password1"
              class="mb-2 block text-xl font-medium text-surface-900 dark:text-surface-0">
              {{ $t("password") }}
            </label>
            <Password
              id="password1"
              v-model="password"
              :placeholder="$t('password')"
              :toggleMask="true"
              class="mb-4"
              fluid
              :feedback="false"></Password>

            <div class="mb-8 mt-2 flex items-center justify-between gap-8">
              <div class="flex items-center">
                <Checkbox
                  v-model="checked"
                  id="rememberme1"
                  binary
                  class="mr-2"></Checkbox>
                <label for="rememberme1">{{ $t("rememberMe") }}</label>
              </div>
              <span
                class="ml-2 cursor-pointer text-right font-medium text-primary no-underline">
                {{ $t("forgotPassword") }}
              </span>
            </div>
            <Button
              label="Initialize Admin"
              class="w-full"
              @click="initExecute()"
              :loading="initStatus === 'pending'"
              severity="warn"
              v-if="!isInitialized" />
            <Button
              :disabled="!email || !password"
              :label="$t('login')"
              class="w-full"
              @click="loginExecute()"
              :loading="loginStatus === 'pending'"
              v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import type { MenuMethods } from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";
import type { PopoverMethods } from "primevue/popover";
import { FetchError } from "ofetch";
import Logo from "~/assets/icons/logo.svg?component";

const { t } = useI18n();
const toast = useToast();
const session = useSessionStore();
const layout = useLayoutStore();
const themeConfiguratorPopover = ref<PopoverMethods | null>(null);
const toggleThemeConfiguratorPopover = (event: Event) => {
  themeConfiguratorPopover.value?.toggle(event);
};
const userMenu = ref<MenuMethods | null>(null);
const toggleUserMenu = (event: Event) => {
  userMenu.value?.toggle(event);
};
const mobileMenu = ref<MenuMethods | null>(null);
const toggleMobileMenu = (event: Event) => {
  mobileMenu.value?.toggle(event);
};
const userMenuItems = ref<MenuItem[]>([
  {
    label: t("logout"),
    icon: "pi pi-sign-out",
    command: async () => {
      try {
        await session.logout();
        toast.add({
          severity: "success",
          summary: t("logoutSuccess"),
          detail: t("logoutSuccess"),
          life: 3000,
        });
        navigateTo("/");
      } catch (error) {
        if (error instanceof FetchError) {
          toast.add({
            severity: "error",
            summary: t("logoutFailed"),
            detail: error.statusMessage,
            life: 3000,
          });
        }
      }
    },
  },
]);
const mobileMenuItems = ref<MenuItem[]>([
  {
    label: t("adminPanel"),
    icon: "pi pi-wrench",
    command: () => {
      navigateTo("/admin");
    },
  },
  {
    separator: true,
  },
  ...userMenuItems.value,
]);
const { locale, localeCodes, setLocale } = useI18n();

const localesOptions = computed(() =>
  localeCodes.value.map((i) => {
    const languageNames = new Intl.DisplayNames([String(i)], {
      type: "language",
    });
    return {
      label: languageNames.of(String(i)),
      value: String(i),
      command: () => {
        setLocale(String(i));
      },
    };
  }),
);
const languageMenu = ref<MenuMethods | null>(null);
const toggleLanguageMenu = (event: Event) => {
  languageMenu.value?.toggle(event);
};
</script>

<template>
  <div
    class="flex h-16 w-full items-center bg-[var(--p-content-background)] px-8 lg:px-8">
    <div class="flex w-80 items-center lg:w-auto">
      <Button
        v-if="session.user && !$route.path.startsWith('/admin')"
        class="lg:hidden"
        icon="pi pi-bars"
        size="large"
        @click="layout.sidebarDrawerVisible = true"
        rounded
        text
        severity="secondary" />
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-2xl font-medium">
        <Logo class="w-12 text-[var(--p-primary-color)]" />
        <span>SAKAI</span>
      </NuxtLink>
    </div>
    <div class="ml-auto flex gap-4">
      <Button
        type="button"
        rounded
        @click="toggleLanguageMenu"
        icon="pi pi-language"
        severity="secondary"
        text
        size="large"
        aria-controls="language-menu" />
      <Menu
        class="min-w-fit"
        ref="languageMenu"
        id="language-menu"
        :model="localesOptions"
        :popup="true">
        <template #item="{ item }">
          <Button
            :severity="locale === item.value ? 'primary' : 'secondary'"
            :disabled="locale === item.value"
            text
            size="small"
            @click="setLocale(item.value)">
            {{ item.label }}
          </Button>
        </template>
      </Menu>
      <Button
        type="button"
        rounded
        @click="layout.toogleDarkTheme"
        :icon="layout.darkTheme ? 'pi pi-sun' : 'pi pi-moon'"
        severity="secondary"
        text
        size="large" />
      <Button
        v-if="!session.user"
        type="button"
        rounded
        severity="secondary"
        text
        size="large"
        icon="pi pi-sign-in"
        :as="NuxtLink"
        to="/login" />
      <Button
        v-if="session.user"
        icon="pi pi-palette"
        type="button"
        size="large"
        rounded
        @click="toggleThemeConfiguratorPopover" />
      <Button
        v-if="session.user"
        icon="pi pi-ellipsis-v"
        class="lg:hidden"
        size="large"
        type="button"
        severity="secondary"
        text
        rounded
        @click="toggleMobileMenu" />
      <Button
        v-if="session.user"
        :title="t('adminPanel')"
        type="button"
        icon="pi pi-wrench"
        severity="secondary"
        text
        rounded
        size="large"
        class="max-lg:hidden"
        :as="NuxtLink"
        to="/admin" />
      <Button
        v-if="session.user"
        type="button"
        icon="pi pi-user"
        severity="secondary"
        text
        rounded
        size="large"
        class="max-lg:hidden"
        @click="toggleUserMenu" />
    </div>
    <Popover ref="themeConfiguratorPopover">
      <AppConfigurator />
    </Popover>
    <Menu ref="userMenu" :model="userMenuItems" :popup="true" />
    <Menu ref="mobileMenu" :model="mobileMenuItems" :popup="true" />
  </div>
</template>

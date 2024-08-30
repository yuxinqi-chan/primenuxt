<script setup lang="ts">
import { NuxtLink } from "#components";
import type { MenuMethods } from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";
import type { PopoverMethods } from "primevue/popover";
import Logo from "~/assets/icons/logo.svg?component";

const props = defineProps<{
  class?: string;
}>();
const { user, logout } = useAuth();
const { toggleDarkMode, isDarkTheme, sidebarDrawerVisible } = useLayout();
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
    label: "登出",
    icon: "pi pi-sign-out",
    command: async () => {
      await logout();
      navigateTo("/");
    },
  },
]);
const mobileMenuItems = ref<MenuItem[]>([
  {
    label: "后台管理",
    icon: "pi pi-wrench",
  },
  {
    separator: true,
  },
  ...userMenuItems.value,
]);
</script>

<template>
  <div
    class="flex h-16 w-full items-center bg-[var(--p-content-background)] px-8 lg:px-8"
    :class="props.class">
    <div class="flex w-80 items-center lg:w-auto">
      <Button
        v-if="user && !$route.path.startsWith('/admin')"
        class="lg:hidden"
        icon="pi pi-bars"
        size="large"
        @click="sidebarDrawerVisible = true"
        rounded
        text
        severity="secondary" />
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-2xl font-medium">
        <Logo class="w-12" />
        <span>SAKAI</span>
      </NuxtLink>
    </div>
    <div class="ml-auto flex gap-4">
      <Button
        type="button"
        rounded
        @click="toggleDarkMode"
        :icon="isDarkTheme ? 'pi pi-sun' : 'pi pi-moon'"
        severity="secondary"
        text
        size="large" />
      <Button
        v-if="!user"
        type="button"
        rounded
        severity="secondary"
        text
        size="large"
        icon="pi pi-sign-in"
        :as="NuxtLink"
        to="/login" />
      <Button
        v-if="user"
        icon="pi pi-palette"
        type="button"
        size="large"
        rounded
        @click="toggleThemeConfiguratorPopover" />
      <Button
        v-if="user"
        icon="pi pi-ellipsis-v"
        class="lg:hidden"
        size="large"
        type="button"
        severity="secondary"
        text
        rounded
        @click="toggleMobileMenu" />
      <Button
        v-if="user"
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
        v-if="user"
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

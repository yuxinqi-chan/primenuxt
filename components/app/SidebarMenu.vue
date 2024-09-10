<script setup lang="ts">
const { t } = useI18n();
const model = computed(() => [
  {
    label: t("dashboard"),
    items: [{ label: t("dashboard"), icon: "pi pi-fw pi-home", to: "/admin" }],
  },
  {
    label: t("resourcesManagement"),
    items: [
      {
        label: t("articles"),
        icon: "pi pi-fw pi-pen-to-square",
        to: "/admin/articles",
      },
      {
        label: t("account"),
        icon: "pi pi-fw pi-user",
        to: "/admin/account",
      },
    ],
  },
]);
</script>

<template>
  <ul>
    <template v-for="(item, i) in model" :key="item.label">
      <app-menu-item :item="item" :index="i"></app-menu-item>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>

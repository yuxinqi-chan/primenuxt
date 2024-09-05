<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>();
const appConfig = useAppConfig();
const model = appConfig.menuItems;
</script>

<template>
  <ul v-auto-animate>
    <template v-for="(item, i) in model" :key="item.label">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"></app-menu-item>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>

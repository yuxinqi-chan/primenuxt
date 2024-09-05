<script setup lang="ts">
import type { MenuItem } from "~/types/layout";

const route = useRoute();

export interface Props {
  item: MenuItem;
  index?: number;
  root?: boolean;
  parentItemKey?: string | null;
}

withDefaults(defineProps<Props>(), {
  index: 0,
  root: true,
  parentItemKey: null,
});

const isActiveMenu = ref(false);
const itemKey = ref<string | null>(null);

function checkActiveRoute(item: MenuItem) {
  return route.path === item.to;
}
</script>

<template>
  <li>
    <div
      v-if="root && item.visible !== false"
      class="my-3 text-sm font-bold uppercase">
      {{ item.label }}
    </div>
    <NuxtLink
      v-if="item.to && !item.items && item.visible !== false"
      class="ml-2 flex items-center overflow-hidden rounded-[var(--p-content-border-radius)] px-4 py-3 hover:bg-[var(--p-content-hover-background)]"
      :class="[
        item.class,
        { 'font-bold text-primary': checkActiveRoute(item) },
      ]"
      tabindex="0"
      :to="item.to">
      <i :class="item.icon" class="mr-2"></i>
      <span>{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down" v-if="item.items"></i>
    </NuxtLink>
    <Transition v-if="item.items && item.visible !== false">
      <ul v-show="root ? true : isActiveMenu">
        <app-menu-item
          v-for="(child, i) in item.items"
          :key="child.label"
          :index="i"
          :item="child"
          :parentItemKey="itemKey"
          :root="false"></app-menu-item>
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped></style>

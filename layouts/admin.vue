<script setup lang="ts">
const { sidebarDrawerVisible } = useLayout();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <app-topbar class="sticky top-0 z-10"></app-topbar>
    <div class="flex flex-grow px-8 py-8">
      <Card
        class="sticky top-[6rem] mr-8 h-fit w-80 flex-shrink-0 shadow-none max-lg:hidden">
        <template #content>
          <AppSidebarMenu></AppSidebarMenu>
        </template>
      </Card>
      <div class="flex min-w-0 flex-grow flex-col">
        <slot />
      </div>
    </div>
    <app-footer></app-footer>
  </div>
  <Drawer v-model:visible="sidebarDrawerVisible">
    <AppSidebarMenu></AppSidebarMenu>
  </Drawer>
  <Toast />
</template>

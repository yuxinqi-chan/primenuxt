<script setup lang="ts">
const { sidebarDrawerVisible } = useLayout();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <app-topbar class="sticky top-0"></app-topbar>
    <div class="mx-8 flex flex-grow">
      <Card class="my-8 mr-8 w-80 flex-shrink-0 shadow-none max-lg:hidden">
        <template #content>
          <AppSidebarMenu></AppSidebarMenu>
        </template>
      </Card>
      <div class="mt-8 flex min-w-0 flex-grow flex-col">
        <slot />
        <app-footer class="mt-auto"></app-footer>
      </div>
    </div>
    <Drawer v-model:visible="sidebarDrawerVisible">
      <AppSidebarMenu></AppSidebarMenu>
    </Drawer>
  </div>
  <Toast />
</template>

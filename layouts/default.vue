<template>
  <el-container>
    <el-header class="flex justify-between">
      <div class="m-5 cursor-pointer"></div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect">
        <el-menu-item
          v-for="item in menuItems"
          :index="item.index"
          :key="item.index">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
      <div class="m-5 cursor-pointer"></div>
    </el-header>
    <el-main class="max-w-screen-xl mx-auto w-full">
      <slot />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
const menuItems = [{ index: "0", label: "主页" }];
const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style></style>

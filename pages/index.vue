<template>
  <el-row :gutter="20">
    <el-col :span="16" class="flex flex-col">
      <el-card
        shadow="hover"
        class="cursor-pointer mb-4"
        v-for="i in 10"
        :key="i">
        <template #header>
          <el-link :underline="false">Without Underline</el-link>
        </template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-image
              class="rounded-md w-full"
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
          </el-col>
          <el-col :span="16">
            <p>
              Description of the hamburger Description of the hamburger
              Description of the hamburger Description of the hamburger
              Description of the hamburger Description of the hamburger
              Description of the hamburger Description of the hamburger
              Description of the hamburger Description of the hamburger
              Description of the hamburger Description of the hamburger
              Description of the hamburger
            </p>
            <div>
              <el-tag type="primary">Tag 1</el-tag>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="8" class="flex flex-col">
      <el-card shadow="never" class="mb-4">
        <template #header>其他文章</template>
      </el-card>
      <el-card shadow="never" class="mb-4">
        <template #header>标签云</template>
        <div class="flex flex-wrap gap-1">
          <el-tag type="primary" v-for="i in 18" :key="i">Tag {{ i }}</el-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup></script>

<style></style>

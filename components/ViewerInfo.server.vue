<template>
  <Card>
    <template #title>访客信息</template>
    <template #content>
      <div class="flex flex-col items-start gap-2">
        <Tag
          icon="pi pi-globe"
          :value="$headers?.get('CF-Connecting-IP') || 'Unknown'"></Tag>
        <Tag icon="pi pi-map-marker" :value="$cf?.region || 'Unknown'"></Tag>
        <Tag icon="pi pi-building" :value="$cf?.city || 'Unknown'"></Tag>
        <Tag icon="pi pi-clock" :value="$cf?.timezone"></Tag>
        <Tag icon="pi pi-sitemap">
          <div class="flex items-center gap-1" v-if="$cf?.asOrganization">
            <span>{{ $cf?.asOrganization }}</span>
            <span>{{ $cf?.asn }}</span>
          </div>
          <div class="flex items-center gap-1" v-else>
            <span>Unknown</span>
          </div>
        </Tag>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup></script>

<style></style>

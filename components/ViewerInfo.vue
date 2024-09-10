<template>
  <Card>
    <template #title>访客信息</template>
    <template #content>
      <div class="flex flex-col items-start gap-2">
        <Tag icon="pi pi-globe" :value="$cf.ip || 'Unknown'"></Tag>
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
        <div id="map" class="h-40 w-full rounded-md"></div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
const cf = useNuxtApp().$cf;
const latitude = Number(cf.latitude);
const longitude = Number(cf.longitude);
async function initMap() {
  const L = await import("leaflet");
  const map = L.map("map", {
    zoomControl: false,
  }).setView([latitude, longitude], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '<a target="_blank" href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | © <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);
  L.marker([latitude, longitude]).addTo(map).openPopup();
  map.attributionControl.setPrefix("");
  map.invalidateSize();
}
onMounted(() => {
  initMap();
});
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
</style>

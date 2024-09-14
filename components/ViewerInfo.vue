<template>
  <Card>
    <template #title>{{ $t("viewerInfo") }}</template>
    <template #content>
      <div class="flex flex-col items-start gap-2">
        <Tag
          icon="pi pi-globe"
          :value="cf.ip || $t('unknown')"
          severity="info"></Tag>
        <Tag
          icon="pi pi-map-marker"
          :value="position || $t('unknown')"
          severity="info"></Tag>
        <Tag icon="pi pi-clock" :value="cf.timezone" severity="info"></Tag>
        <Tag icon="pi pi-sitemap" severity="info">
          <div class="flex items-center gap-1" v-if="cf.asOrganization">
            <span>{{ cf.asOrganization }}</span>
            <span>{{ cf.asn }}</span>
          </div>
          <div class="flex items-center gap-1" v-else>
            <span>{{ $t("unknown") }}</span>
          </div>
        </Tag>
        <div
          class="h-40 w-full overflow-hidden rounded-md"
          v-if="latitude && longitude">
          <LMap
            ref="map"
            :options="{ zoomControl: false, attributionControl: true }"
            :zoom="zoom"
            :center="[latitude, longitude]"
            :use-global-leaflet="false">
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              layer-type="base"
              name="OpenStreetMap"
              @ready="replacePrefix" />
          </LMap>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { useCloudflareStore } from "~/stores/cloudflare";

const isMounted = useMounted();
const { locale, t } = useI18n();
const cf = useCloudflareStore();
const latitude = Number(cf.latitude);
const longitude = Number(cf.longitude);
const zoom = ref(8);
const map = ref();
function replacePrefix() {
  map.value.leafletObject.attributionControl.setPrefix(
    `<a target="_blank" href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>`,
  );
}

const regionNames = new Intl.DisplayNames([locale.value], {
  type: "region",
});
const position = computed(() =>
  [
    cf.continent && t(`continent.${cf.continent}`),
    (isMounted && cf.country && regionNames.of(cf.country)) || cf.countryNames,
    cf.region,
    cf.city,
  ]
    .filter(Boolean)
    .join("-"),
);
</script>

<style>
@import "leaflet/dist/leaflet.css";
.leaflet-pane {
  z-index: 0;
}
.leaflet-bottom {
  z-index: 0;
}
</style>

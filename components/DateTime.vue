<template>
  <time :datetime="dayjs(date).utc().toString()">
    {{ dayjsLocale(date, dataLocale, dataTimezone).format(format) }}
    {{ showTimezone ? `(${dataTimezone})` : "" }}
  </time>
</template>

<script lang="ts" setup>
import { useCloudflareStore } from "~/stores/cloudflare";

const cf = useCloudflareStore();
const props = defineProps<{
  date: Date | string | number;
  format: string;
  timezone?: string;
  locale?: string;
  showTimezone?: boolean;
}>();
const { locale: i18nLocale } = useI18n();
const dataLocale = computed(() => props.locale || i18nLocale.value);
const dataTimezone = ref(props.timezone || cf.timezone);
onMounted(() => {
  // when client, get timezone from browser
  dataTimezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
});
</script>

<style></style>

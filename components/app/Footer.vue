<script setup>
const { t } = useI18n();
const config = useRuntimeConfig();
const currentYear = new Date().getFullYear();
</script>
<template>
  <div
    class="border-t border-solid border-[var(--p-content-border-color)] py-4">
    <div
      class="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-2">
      <div class="text-sm">
        &copy; {{ currentYear }} {{ config.public.siteName }}.
        {{ t("allRightsReserved") }}
      </div>
      <div class="text-sm">
        Powered by
        <a
          href="https://nuxt.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-primary hover:underline">
          Nuxt
        </a>
        ,
        <a
          href="https://primevue.org"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-primary hover:underline">
          PrimeVue
        </a>
        and
        <a
          href="https://pages.cloudflare.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-primary hover:underline">
          Cloudflare Pages
        </a>
      </div>
    </div>
  </div>
</template>

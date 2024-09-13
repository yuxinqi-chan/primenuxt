<template>
  <div
    id="app-loader"
    class="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[var(--surface-ground)]">
    <div class="loader"></div>
  </div>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toast />
  </NuxtLayout>
</template>
<script setup>
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  if (import.meta.client) {
    document.getElementById("app-loader").style.display = "none";
  }
});
// Initialize stores
useSessionStore();
useCloudflareStore();
useLayoutStore();
const config = useRuntimeConfig();
useHead({
  titleTemplate: (title) => `${title} - ${config.public.siteName}`,
});
</script>
<style lang="scss">
@import "primeicons/primeicons.css";
:root {
  --surface-ground: var(--p-surface-100);
}

:root[class*="app-dark"] {
  --surface-ground: var(--p-surface-950);
}

html {
  font-size: 14px;
}

body {
  font-family: "Helvetica Neue", "Segoe UI", Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background-color: var(--surface-ground);
}
.ql-snow {
  img {
    display: inline-block;
  }
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.loader {
  width: 60px;
  aspect-ratio: 1;
  display: grid;
  grid: 50%/50%;
  color: #25b09b;
  --_g: no-repeat linear-gradient(currentColor 0 0);
  background: var(--_g), var(--_g), var(--_g);
  background-size: 50.1% 50.1%;
  animation:
    l6-0 1.5s infinite steps(1) alternate,
    l6-0-0 3s infinite steps(1);
}
.loader::before {
  content: "";
  background: currentColor;
  transform: perspective(150px) rotateY(0deg) rotateX(0deg);
  transform-origin: bottom right;
  animation: l6-1 1.5s infinite linear alternate;
}
@keyframes l6-0 {
  0% {
    background-position:
      0 100%,
      100% 100%,
      100% 0;
  }
  33% {
    background-position:
      100% 100%,
      100% 100%,
      100% 0;
  }
  66% {
    background-position:
      100% 0,
      100% 0,
      100% 0;
  }
}
@keyframes l6-0-0 {
  0% {
    transform: scaleX(1) rotate(0deg);
  }
  50% {
    transform: scaleX(-1) rotate(-90deg);
  }
}
@keyframes l6-1 {
  16.5% {
    transform: perspective(150px) rotateX(-90deg) rotateY(0deg) rotateX(0deg);
    filter: grayscale(0.8);
  }
  33% {
    transform: perspective(150px) rotateX(-180deg) rotateY(0deg) rotateX(0deg);
  }
  66% {
    transform: perspective(150px) rotateX(-180deg) rotateY(-180deg)
      rotateX(0deg);
  }
  100% {
    transform: perspective(150px) rotateX(-180deg) rotateY(-180deg)
      rotateX(-180deg);
    filter: grayscale(0.8);
  }
}
</style>

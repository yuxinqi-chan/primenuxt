export default defineNuxtRouteMiddleware((to, from) => {
  const session = useSessionStore();
  if (!session.user && to.path !== "/login") {
    return navigateTo("/login");
  } else if (session.user && to.path === "/login") {
    return navigateTo("/");
  }
});

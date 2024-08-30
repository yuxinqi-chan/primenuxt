export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();
  if (!user.value && to.path !== "/login") {
    return navigateTo("/login");
  } else if (user.value && to.path === "/login") {
    return navigateTo("/");
  }
});

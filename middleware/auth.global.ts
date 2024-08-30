export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth();
  const { data } = await useFetch("/api/auth/user");
  if (data) {
    user.value = data.value;
  }
});

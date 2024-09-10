export default defineNuxtRouteMiddleware(async (to, from) => {
  await callOnce(async () => {
    const { user } = useAuth();
    const { data } = await useFetch("/api/auth/user");
    if (data) {
      user.value = data.value;
    }
  });
});

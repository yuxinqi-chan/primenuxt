import type { User } from "lucia";

export default function () {
  const user = useState<User | null>("user", () => null);
  const logout = async () => {
    if (user.value) {
      await $fetch("/api/auth/logout", { method: "POST" });
      user.value = null;
    }
  };
  const login = async (
    username: MaybeRef<string>,
    password: MaybeRef<string>,
  ) => {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        username: unref(username),
        password: unref(password),
      },
    });
    const data = await $fetch("/api/auth/user");
    if (data) {
      user.value = data;
    }
  };
  const initAdmin = () => $fetch("/api/auth/init", { method: "POST" });
  return { user, logout, login, initAdmin };
}

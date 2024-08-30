import type { User } from "lucia";

export default function () {
  const user = useState<User | null>("user", () => null);
  const logout = () => {
    if (user.value) {
      return $fetch("/api/auth/logout", { method: "POST" });
    }
  };
  const login = (username: MaybeRef<string>, password: MaybeRef<string>) =>
    $fetch("/api/auth/login", {
      method: "POST",
      body: {
        username: unref(username),
        password: unref(password),
      },
    });
  const init = () => $fetch("/api/auth/init", { method: "POST" });
  return { user, logout, login, init };
}

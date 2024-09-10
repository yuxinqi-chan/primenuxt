import { defineStore } from "pinia";

export const useSessionStore = defineStore({
  id: "sessionStore",
  state: () => {
    const event = useRequestEvent();
    const user = event?.context.user;
    return {
      user: user,
    };
  },
  actions: {
    async logout() {
      if (this.user) {
        await $fetch("/api/auth/logout", { method: "POST" });
        this.user = null;
      }
    },
    async login(username: MaybeRef<string>, password: MaybeRef<string>) {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username: unref(username),
          password: unref(password),
        },
      });
      const data = await $fetch("/api/auth/user");
      if (data) {
        this.user = data;
      }
    },
    async initAdmin() {
      await $fetch("/api/auth/init", { method: "POST" });
      const data = await $fetch("/api/auth/user");
      if (data) {
        this.user = data;
      }
    },
  },
});

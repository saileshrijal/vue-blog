import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: reactive(null),
  }),
  getters: {
    isAuthenticated: computed(function() {
      return !!this.user;
    })
  },
  actions: {
    login(user) {
      this.user = user;
    }
  }
});

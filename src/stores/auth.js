import { defineStore } from "pinia";
import { login, signup, logout, getSession } from "../services/api.js";
import { MSG_SESSION_EXPIRED } from "../utils/constants.js";

function setPolite(msg) {
  const n = document.getElementById("toast-live-polite");
  if (n) n.textContent = msg;
}
function setAssertive(msg) {
  const n = document.getElementById("toast-live-assertive");
  if (n) n.textContent = msg;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    hydrated: false,
  }),
  actions: {
    hydrate() {
      try {
        const session = getSession();
        this.user = { email: session.email };
      } catch {
        this.user = null;
      } finally {
        this.hydrated = true;
      }
    },
    async doLogin({ email, password }) {
      try {
        const res = login({ email, password });
        this.user = { email: res.email };
        setPolite("Logged in successfully.");
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err };
      }
    },
    async doSignup({ email, password }) {
      try {
        const res = signup({ email, password });
        this.user = { email: res.email };
        setPolite("Account created.");
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err };
      }
    },
    async doLogout() {
      try { logout(); } catch {}
      this.user = null;
      setPolite("Signed out.");
    },
    expireSession() {
      this.user = null;
      setAssertive(MSG_SESSION_EXPIRED);
    },
  },
});

const AUTH_STORAGE_KEY = "auth-storage";
const PENDING_PAYMENT_KEY = "vk_pending_payment";

export const clearSessionData = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(PENDING_PAYMENT_KEY);
  sessionStorage.clear();
};

export const forceSessionLogout = ({
  redirectTo = "/home",
  reload = true,
} = {}) => {
  if (typeof window === "undefined") return;

  clearSessionData();

  if (reload) {
    window.location.replace(redirectTo);
  }
};

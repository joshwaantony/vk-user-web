const AUTH_STORAGE_KEY = "auth-storage";
const PENDING_PAYMENT_KEY = "vk_pending_payment";

const expireCookie = (name) => {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax${secure}`;
};

export const clearSessionData = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(PENDING_PAYMENT_KEY);
  sessionStorage.clear();

  expireCookie("token");
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

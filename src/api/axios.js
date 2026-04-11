
import axios from "axios";
import { forceSessionLogout } from "@/lib/session";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* -------------------------------------------------
   AXIOS INSTANCE
------------------------------------------------- */
const api = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
});

const REFRESH_ENDPOINT = "/auth/refresh";
const REFRESH_BYPASS_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/otp/send",
  "/auth/otp/verify",
  "/auth/password/reset",
];

const normalizeToken = (token) =>
  typeof token === "string" ? token.trim() : "";

const getStoredAccessToken = () => {
  if (typeof window === "undefined") return "";
  return normalizeToken(localStorage.getItem("token"));
};

const setStoredToken = (token) => {
  if (typeof window === "undefined") return;
  const cleanToken = normalizeToken(token);
  if (!cleanToken) return;

  localStorage.setItem("token", cleanToken);
};

const clearStoredToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

const extractTokens = (payload) => {
  const data = payload?.data ?? payload ?? {};
  return {
    accessToken: normalizeToken(data?.accessToken || data?.token),
  };
};

const persistRefreshedTokens = ({ accessToken }) => {
  if (typeof window === "undefined") return;
  if (accessToken) setStoredToken(accessToken);
};

const extractAccessToken = (payload) =>
  normalizeToken(
    payload?.accessToken || payload?.token || payload?.data?.accessToken
  );

const getResponseMessage = (error) =>
  normalizeToken(error?.response?.data?.message).toLowerCase();

const isExplicitSessionExpiry = (error) =>
  error?.response?.status === 401 &&
  getResponseMessage(error).includes("session expired");

const shouldSkipRefresh = (url = "") =>
  url.includes(REFRESH_ENDPOINT) ||
  REFRESH_BYPASS_ROUTES.some((route) => url.includes(route));

/* -------------------------------------------------
   REQUEST INTERCEPTOR
------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getStoredAccessToken();
      if (token && !config.url?.includes(REFRESH_ENDPOINT)) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------
   RESPONSE INTERCEPTOR (TOKEN REFRESH HANDLER)
------------------------------------------------- */

let isRefreshing = false;
let failedQueue = [];

/* Process queued requests */
const processQueue = (error, token = "") => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";
    if (!originalRequest) return Promise.reject(error);

    if (isExplicitSessionExpiry(error)) {
      processQueue(error, null);
      clearStoredToken();
      forceSessionLogout();
      return Promise.reject(error);
    }

    /* ---------------------------------------------
       TOKEN EXPIRED → TRY REFRESH
    --------------------------------------------- */
    if (
      status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh(url)
    ) {
      originalRequest._retry = true;

      // ⏳ If refresh already in progress → queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await api.post(
          REFRESH_ENDPOINT,
          {},
          { headers: { "X-Skip-Auth-Refresh": "true" } }
        );
        const tokens = extractTokens(res?.data);
        const cleanToken = tokens.accessToken || extractAccessToken(res?.data);
        if (!cleanToken) {
          throw new Error("No token returned from refresh");
        }

        persistRefreshedTokens({ accessToken: cleanToken });
        processQueue(null, cleanToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${cleanToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearStoredToken();
        forceSessionLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

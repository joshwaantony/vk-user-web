


import axios from "axios";

/* -------------------------------------------------
   AXIOS INSTANCE
------------------------------------------------- */
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
});

/* -------------------------------------------------
   REQUEST INTERCEPTOR
------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      // ❌ Do NOT attach token for refresh request
      if (token && !config.url?.includes("/auth/refresh")) {
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

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";

    /* ---------------------------------------------
       AUTH ROUTES → NEVER TRY REFRESH
    --------------------------------------------- */
    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/send-otp") ||
      url.includes("/auth/verify-otp") ||
      url.includes("/auth/forgot-password");

    if (status === 401 && isAuthRoute) {
      return Promise.reject(error);
    }

    /* ---------------------------------------------
       TOKEN EXPIRED → TRY REFRESH
    --------------------------------------------- */
    if (
      status === 401 &&
      !originalRequest._retry &&
      !url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      // ⏳ If refresh already running, queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh");

        const newToken = res.data?.accessToken || res.data?.token;

        if (!newToken) {
          throw new Error("No token returned from refresh");
        }

        localStorage.setItem("token", newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("token");

        // Optional redirect
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

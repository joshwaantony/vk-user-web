


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

      // ❌ NEVER attach token for refresh endpoint
      if (token && !config.url?.includes("refresh")) {
        config.headers.Authorization = `Bearer ${token.trim()}`;
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
const processQueue = (error, token = null) => {
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

    /* ---------------------------------------------
       DO NOT TRY REFRESH FOR AUTH ROUTES
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
      !url.includes("refresh")
    ) {
      originalRequest._retry = true;

      // ⏳ If refresh already in progress → queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // 🔥 Call refresh endpoint (NO Authorization header attached)
        const res = await api.post("/auth/refresh");

        console.log("Refresh response:", res.data);

        // Adjust this if your backend returns { success, data: { accessToken } }
        const newToken =
          res.data?.accessToken ||
          res.data?.token ||
          res.data?.data?.accessToken;

        if (!newToken) {
          throw new Error("No token returned from refresh");
        }

        // 🔥 Clean token (remove spaces/newlines)
        const cleanToken = newToken.replace(/\s+/g, "");

        // Store new token
        localStorage.setItem("token", cleanToken);

        // Resolve queued requests
        processQueue(null, cleanToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${cleanToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        processQueue(refreshError, null);

        localStorage.removeItem("token");

        // Optional redirect
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
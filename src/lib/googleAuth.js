import { getSafeAuthRedirect } from "@/lib/authRedirect";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const GOOGLE_AUTH_REDIRECT_KEY = "vk_google_auth_redirect";

export const GOOGLE_AUTH_START_URL = `${API_ORIGIN}/api/v1/auth/google`;

export const startGoogleLogin = () => {
  if (typeof window === "undefined") return;

  const redirect = getSafeAuthRedirect(
    new URLSearchParams(window.location.search).get("redirect"),
    ""
  );

  console.info("[google-auth] starting login", {
    pathname: window.location.pathname,
    redirect: redirect || null,
    apiOrigin: API_ORIGIN,
    startUrl: GOOGLE_AUTH_START_URL,
  });

  if (redirect) {
    sessionStorage.setItem(GOOGLE_AUTH_REDIRECT_KEY, redirect);
  } else {
    sessionStorage.removeItem(GOOGLE_AUTH_REDIRECT_KEY);
  }

  window.location.href = GOOGLE_AUTH_START_URL;
};

export const handleGoogleSuccessRedirect = () => {
  if (typeof window === "undefined") {
    return { ok: false, reason: "server_render" };
  }

  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("accessToken");

  console.info("[google-auth] handling success redirect", {
    pathname: window.location.pathname,
    hasAccessToken: Boolean(accessToken),
    search: window.location.search,
  });

  if (!accessToken) {
    console.warn("[google-auth] missing access token on success redirect", {
      pathname: window.location.pathname,
      search: window.location.search,
    });
    return { ok: false, reason: "missing_access_token" };
  }

  localStorage.setItem("token", accessToken);
  window.history.replaceState({}, document.title, window.location.pathname);

  return { ok: true, accessToken };
};

export const consumeGoogleAuthRedirect = (fallback = "/course") => {
  if (typeof window === "undefined") return fallback;

  const redirect = sessionStorage.getItem(GOOGLE_AUTH_REDIRECT_KEY);
  sessionStorage.removeItem(GOOGLE_AUTH_REDIRECT_KEY);

  return getSafeAuthRedirect(redirect, fallback);
};

export const getGoogleErrorMessage = (error) => {
  switch (error) {
    case "GOOGLE_CODE_MISSING":
      return "Google sign-in could not be completed.";
    case "GOOGLE_LOGIN_FAILED":
      return "Google sign-in failed. Please try again.";
    case "ACCOUNT_LINK_REQUIRED":
      return "An account already exists with this email. Please sign in using your existing method first.";
    case "GOOGLE_EMAIL_MISMATCH":
      return "Please use the same Google email as your existing account.";
    case "GOOGLE_ACCOUNT_ALREADY_LINKED":
      return "This Google account is already linked to another user.";
    case "GOOGLE_AUTH_DISABLED":
      return "Google sign-in is currently unavailable.";
    default:
      return "Unable to sign in with Google.";
  }
};

const DEFAULT_AUTH_REDIRECT = "/course";

export const getSafeAuthRedirect = (
  redirect,
  fallback = DEFAULT_AUTH_REDIRECT
) => {
  if (typeof redirect !== "string") return fallback;

  const trimmedRedirect = redirect.trim();

  if (!trimmedRedirect.startsWith("/") || trimmedRedirect.startsWith("//")) {
    return fallback;
  }

  return trimmedRedirect;
};

export const getAuthRedirectFromLocation = (
  fallback = DEFAULT_AUTH_REDIRECT
) => {
  if (typeof window === "undefined") return fallback;

  const redirect = new URLSearchParams(window.location.search).get("redirect");
  return getSafeAuthRedirect(redirect, fallback);
};

export { DEFAULT_AUTH_REDIRECT };

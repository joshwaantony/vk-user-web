const GOOGLE_LINK_PENDING_KEY = "vk_google_link_pending";
const GOOGLE_IDENTITY_SCRIPT_ID = "google-identity-services";
const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleIdentityScriptPromise = null;

export const getGoogleClientId = () =>
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export const markGoogleLinkPending = () => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(GOOGLE_LINK_PENDING_KEY, "1");
};

export const clearGoogleLinkPending = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(GOOGLE_LINK_PENDING_KEY);
};

export const hasGoogleLinkPending = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(GOOGLE_LINK_PENDING_KEY) === "1";
};

export const loadGoogleIdentityScript = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Identity Services can only load in the browser"));
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleIdentityScriptPromise) {
    return googleIdentityScriptPromise;
  }

  googleIdentityScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_IDENTITY_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => {
        reject(new Error("Failed to load Google Identity Services"));
      }, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_IDENTITY_SCRIPT_ID;
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      googleIdentityScriptPromise = null;
      reject(new Error("Failed to load Google Identity Services"));
    };

    document.head.appendChild(script);
  });

  return googleIdentityScriptPromise;
};

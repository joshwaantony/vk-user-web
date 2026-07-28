const GOOGLE_LINK_PENDING_KEY = "vk_google_link_pending";
const GOOGLE_LINK_EMAIL_KEY = "vk_google_link_email";
const GOOGLE_LINK_TOKEN_KEY = "vk_google_link_token";
const GOOGLE_IDENTITY_SCRIPT_ID = "google-identity-services";
const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleIdentityScriptPromise = null;

export const getGoogleClientId = () =>
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export const setGoogleLinkContext = ({
  email = "",
  pendingLinkToken = "",
} = {}) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(GOOGLE_LINK_PENDING_KEY, "1");
  if (email) {
    sessionStorage.setItem(GOOGLE_LINK_EMAIL_KEY, email);
  } else {
    sessionStorage.removeItem(GOOGLE_LINK_EMAIL_KEY);
  }

  if (pendingLinkToken) {
    sessionStorage.setItem(GOOGLE_LINK_TOKEN_KEY, pendingLinkToken);
  } else {
    sessionStorage.removeItem(GOOGLE_LINK_TOKEN_KEY);
  }
};

export const clearGoogleLinkContext = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(GOOGLE_LINK_PENDING_KEY);
  sessionStorage.removeItem(GOOGLE_LINK_EMAIL_KEY);
  sessionStorage.removeItem(GOOGLE_LINK_TOKEN_KEY);
};

export const hasGoogleLinkPending = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(GOOGLE_LINK_PENDING_KEY) === "1";
};

export const getGoogleLinkContext = () => {
  if (typeof window === "undefined") return { pending: false };

  return {
    pending: hasGoogleLinkPending(),
    email: sessionStorage.getItem(GOOGLE_LINK_EMAIL_KEY) || "",
    pendingLinkToken: sessionStorage.getItem(GOOGLE_LINK_TOKEN_KEY) || "",
  };
};

export const consumeGoogleLinkContext = () => {
  const context = getGoogleLinkContext();
  clearGoogleLinkContext();
  return context;
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

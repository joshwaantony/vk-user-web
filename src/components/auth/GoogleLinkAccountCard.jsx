"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import PromoLoader from "@/components/loader/PromoLoader";
import { useAuthStore } from "@/store/auth.store";
import { linkGoogleAccountApi } from "@/services/auth.service";
import {
  clearGoogleLinkContext,
  getGoogleLinkContext,
  getGoogleClientId,
  loadGoogleIdentityScript,
} from "@/lib/googleLink";
import { getGoogleErrorMessage } from "@/lib/googleAuth";

const getLinkErrorMessage = (err) => {
  const code =
    err?.response?.data?.code ||
    err?.response?.data?.error ||
    err?.response?.data?.message;

  return {
    code,
    message:
      getGoogleErrorMessage(code) ||
      err?.response?.data?.message ||
      "Unable to link Google account.",
  };
};

export default function GoogleLinkAccountCard({ onClose, onSuccess }) {
  const router = useRouter();
  const buttonRef = useRef(null);
  const setToken = useAuthStore((state) => state.setToken);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { email } = getGoogleLinkContext();

  useEffect(() => {
    let cancelled = false;

    const mountGoogleButton = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const clientId = getGoogleClientId();

        if (!clientId) {
          throw new Error(
            "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable"
          );
        }

        await loadGoogleIdentityScript();

        if (cancelled || !buttonRef.current || !window.google?.accounts?.id) {
          return;
        }

        buttonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            const idToken = response?.credential;

            if (!idToken) {
              setErrorMessage("Google sign-in did not return an id token.");
              toast.error("Google sign-in did not return an id token.");
              return;
            }

            setSubmitting(true);
            setErrorMessage("");

            try {
              const res = await linkGoogleAccountApi({ idToken });
              const payload = res?.data ?? res ?? {};
              const accessToken = payload?.accessToken || payload?.token;

              if (!accessToken) {
                throw new Error("Access token missing from link response");
              }

              setToken(accessToken);
              clearGoogleLinkContext();

              try {
                await fetchMe();
              } catch (fetchError) {
                console.error("Failed to refresh user after Google link:", fetchError);
              }

              toast.success("Google account linked");
              if (onSuccess) {
                onSuccess();
              } else {
                router.replace("/profile");
              }
            } catch (err) {
              const { message, code } = getLinkErrorMessage(err);
              setErrorMessage(message);
              toast.error(message);
              console.warn("[google-link] link request failed", {
                code,
                message,
              });
            } finally {
              setSubmitting(false);
            }
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: buttonRef.current.clientWidth || 360,
          text: "continue_with",
          shape: "rectangular",
        });

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err?.message || "Google sign-in is currently unavailable.";
          setErrorMessage(message);
          setLoading(false);
        }
      }
    };

    mountGoogleButton();

    return () => {
      cancelled = true;
    };
  }, [fetchMe, router, setToken]);

  return (
    <section className="rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:px-6 sm:py-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC]">
          <img src="/google.svg" alt="" className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2457E6]">
            Google linking
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
            Link your Google account
          </h2>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#64748B]">
        Confirm the account below to connect Google sign-in to your profile.
      </p>

      {email ? (
        <div className="mt-5 rounded-2xl border border-[#BFDBFE] bg-[#FBFDFF] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4776F5] text-sm font-bold text-white">
              {String(email).charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="break-words text-sm font-semibold text-[#0F172A] sm:text-[15px]">
                {email}
              </p>
              <p className="mt-0.5 text-xs text-[#64748B]">
                Matched with your existing profile
              </p>
            </div>
            <FiCheckCircle className="shrink-0 text-[#22C55E]" size={22} />
          </div>
        </div>
      ) : null}

      <div className="mt-5">
        <div ref={buttonRef} className="w-full min-h-[44px]" />
        {loading ? (
          <div className="flex justify-center py-4">
            <PromoLoader />
          </div>
        ) : null}
      </div>

      {submitting ? (
        <p className="mt-3 text-xs text-[#64748B]">
          Linking your Google account...
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-3 text-xs font-medium text-[#DC2626]">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xs text-[#94A3B8]">
          Secure and reversible from profile settings.
        </p>
        <button
          type="button"
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              router.replace("/profile");
            }
          }}
          className="text-sm font-semibold text-[#2457E6] transition hover:text-[#1E4ED8]"
        >
          Back
        </button>
      </div>
    </section>
  );
}

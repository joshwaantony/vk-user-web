"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiShield } from "react-icons/fi";
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

export default function GoogleLinkAccountCard() {
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
              router.replace("/profile");
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
    <section className="w-full overflow-hidden rounded-[32px] border border-[#E2E8F0] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="bg-gradient-to-r from-[#2457E6] to-[#1D4ED8] px-6 py-5 text-white sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <img src="/google.svg" alt="" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              Google
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">
              Confirm and link account
            </h2>
          </div>
        </div>
      </div>

      <div className="px-6 py-7 sm:px-8">
        <p className="text-sm leading-6 text-[#64748B]">
          Connect the Google account that matches your existing email so you can sign in with either method.
        </p>

        {email ? (
          <div className="mt-5 rounded-2xl border border-[#BFDBFE] bg-[#F8FBFF] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
              Matched email
            </p>
            <p className="mt-1 break-words text-sm font-semibold text-[#0F172A]">
              {email}
            </p>
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1D4ED8]">
              <FiShield size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Linking is explicit
              </p>
              <p className="mt-1 text-sm leading-6 text-[#64748B]">
                We only connect accounts after you confirm ownership on the existing profile.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div ref={buttonRef} className="w-full min-h-[48px]" />
          {loading ? (
            <div className="flex justify-center py-6">
              <PromoLoader />
            </div>
          ) : null}
        </div>

        {submitting ? (
          <p className="mt-4 text-sm text-[#64748B]">
            Linking your Google account...
          </p>
        ) : null}

        {errorMessage ? (
          <p className="mt-4 text-sm font-medium text-[#DC2626]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.replace("/profile")}
            className="w-full rounded-xl border border-[#CBD5E1] px-4 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            Back to profile
          </button>
        </div>
      </div>
    </section>
  );
}

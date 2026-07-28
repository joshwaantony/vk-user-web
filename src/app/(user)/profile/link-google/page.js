"use client";

import PromoLoader from "@/components/loader/PromoLoader";
import GoogleLinkAccountCard from "@/components/auth/GoogleLinkAccountCard";
import { useAuthStore } from "@/store/auth.store";
import { FiCheckCircle, FiShield, FiLink2, FiArrowRight } from "react-icons/fi";

export default function LinkGooglePage() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        <PromoLoader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F8FF] px-4 py-8 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 lg:mb-12">
          <span className="inline-flex items-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
            Google account linking
          </span>

          <div className="mt-5 max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Link your Google account to make sign-in easier
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
              Confirm the same Google identity used on your account, then you will be able to sign in with either method without creating a new profile.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <section className="relative overflow-hidden rounded-[32px] bg-white px-6 py-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#DBEAFE]/40 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[#E0F2FE]/60 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#1D4ED8]">
                  <FiLink2 size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0F172A]">
                    Safe, explicit linking
                  </h2>
                  <p className="mt-1 text-sm text-[#64748B]">
                    We only link after you confirm ownership with your existing account.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1D4ED8]">
                      <FiShield size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        Protected flow
                      </p>
                      <p className="mt-1 text-sm text-[#64748B]">
                        No automatic account merging.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1D4ED8]">
                      <FiCheckCircle size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        Same email required
                      </p>
                      <p className="mt-1 text-sm text-[#64748B]">
                        Helps prevent accidental account takeover.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[28px] border border-[#DBEAFE] bg-gradient-to-br from-[#F8FBFF] to-white p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
                  What happens next
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    "Click the Google button to verify your Google identity.",
                    "Backend checks the email against your existing account.",
                    "After success, your account is updated and you return to profile.",
                  ].map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2457E6] text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-6 text-[#334155]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#2457E6]">
                <span>Ready when you are</span>
                <FiArrowRight />
              </div>
            </div>
          </section>

          <div className="relative">
            <div className="sticky top-6">
              <GoogleLinkAccountCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

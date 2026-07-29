"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiLock, FiRefreshCw } from "react-icons/fi";
import { useAuthStore } from "@/store/auth.store";
import { updateMePasswordApi } from "@/services/auth.service";

const getPasswordErrorMessage = (err) =>
  err?.response?.data?.errors?.[0]?.message ||
  err?.response?.data?.message ||
  "Failed to save password";

export default function PasswordSetupForm() {
  const router = useRouter();
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const user = useAuthStore((state) => state.user);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("create");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const queryMode = new URLSearchParams(window.location.search).get("mode");
    if (queryMode === "change") {
      setMode("change");
    }
  }, []);

  const isChangeMode = mode === "change";

  const validate = () => {
    if (isChangeMode && !currentPassword.trim()) {
      toast.error("Current password is required");
      return false;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("All fields are required");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const payload = {
        newPassword: password,
      };

      if (isChangeMode) {
        payload.currentPassword = currentPassword;
      }

      await updateMePasswordApi(payload);

      try {
        await fetchMe();
      } catch (fetchError) {
        console.error("Failed to refresh user after password save:", fetchError);
      }

      toast.success("Password saved successfully");
      setPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      router.replace("/profile");
    } catch (err) {
      const message = getPasswordErrorMessage(err);
      setErrorMessage(message);
      toast.error(message);

      const code = err?.response?.data?.code;
      const requiresCurrentPassword =
        code === "CURRENT_PASSWORD_REQUIRED" ||
        /current password/i.test(message);

      if (!isChangeMode && requiresCurrentPassword) {
        setMode("change");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    await handleSave();
  };

  return (
    <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="bg-gradient-to-r from-[#2457E6] to-[#1D4ED8] px-6 py-5 text-white sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <FiLock size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              Security
            </p>
            <h1 className="mt-1 text-2xl font-extrabold">
              {isChangeMode ? "Update Password" : "Create Password"}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-7 sm:px-8">
        <p className="text-sm leading-6 text-[#64748B]">
          {isChangeMode
            ? "Use your current password to set a new one for phone and password login."
            : "Set a password for your current signed-in account. Your session stays active."}
        </p>

        <div className="mt-5 rounded-2xl border border-[#BFDBFE] bg-[#F8FBFF] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
            Signed in as
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0F172A]">
            {user?.email || user?.phone || "Current account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {isChangeMode ? (
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-14 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 pr-12 text-[#0F172A] outline-none transition focus:border-[#2457E6] focus:ring-2 focus:ring-[#2457E6]"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showCurrentPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-14 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 pr-12 text-[#0F172A] outline-none transition focus:border-[#2457E6] focus:ring-2 focus:ring-[#2457E6]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-14 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 pr-12 text-[#0F172A] outline-none transition focus:border-[#2457E6] focus:ring-2 focus:ring-[#2457E6]"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          {errorMessage ? (
            <p className="text-sm font-medium text-[#DC2626]">{errorMessage}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#2457E6] px-5 font-semibold text-white shadow-[0_10px_24px_rgba(36,87,230,0.28)] transition hover:-translate-y-0.5 hover:bg-[#1E4ED8] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>{isChangeMode ? "Update Password" : "Create Password"}</>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="h-14 w-full rounded-xl border border-[#CBD5E1] bg-white px-5 font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
          </div>

          {!isChangeMode ? (
            <button
              type="button"
              onClick={() => setMode("change")}
              className="text-sm font-semibold text-[#2457E6] transition hover:text-[#1E4ED8] hover:underline"
            >
              I already have a password
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode("create");
                setCurrentPassword("");
                setErrorMessage("");
              }}
              className="text-sm font-semibold text-[#2457E6] transition hover:text-[#1E4ED8] hover:underline"
            >
              Create a new password instead
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

import { create } from "zustand";

export const useAuthFlowStore = create((set) => ({
  purpose: "REGISTER",
  title: "What’s your phone number?",
  subtitle:
    "We’ll send you a one-time verification code to confirm your number.",

  setFlow: ({ purpose, title, subtitle }) =>
    set({
      purpose,
      title,
      subtitle,
    }),

  resetFlow: () =>
    set({
      purpose: "REGISTER",
      title: "What’s your phone number?",
      subtitle:
        "We’ll send you a one-time verification code to confirm your number.",
    }),
}));

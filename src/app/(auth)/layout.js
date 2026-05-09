import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Account Access",
  description:
    "Login, signup, OTP verification, and password reset pages for VK Accountancy.",
  path: "/login",
  noIndex: true,
});

export default function AuthLayout({ children }) {
  return children;
}

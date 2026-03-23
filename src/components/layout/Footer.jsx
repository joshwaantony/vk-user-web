"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useAuthStore } from "@/store/auth.store";

export default function Footer() {
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        ...(!isLoggedIn ? [{ label: "Home", href: "/home" }] : []),
        { label: "Courses", href: "/course" },
        { label: "Contact", href: "/contact" },
        { label: "Terms", href: "/terms-and-conditions" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        {
          label: "Cancellation & Refund Policy",
          href: "/cancellation-and-refund-policy",
        },
        {
          label: "Contact Us",
          href: "/contact-us",
        },
      ],
    },
  ];

  return (
    <footer className="bg-[radial-gradient(circle_at_top,#1e293b_0%,#0f172a_45%,#020617_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-sm md:grid-cols-[minmax(0,1.3fr)_minmax(180px,0.7fr)_minmax(220px,0.9fr)] md:gap-10 md:p-10">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10">
                <img src="/logo.svg" alt="VK Logo" className="size-14" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                  VK Learning
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Learn with clarity and momentum.
                </h3>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-300">
              Your trusted platform for learning and growth. Transform your
              career with expert-led courses in tax, accounting, and finance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <SocialIcon>
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon>
                <FaTwitter />
              </SocialIcon>
              <SocialIcon>
                <FaLinkedinIn />
              </SocialIcon>
              <SocialIcon>
                <FaInstagram />
              </SocialIcon>
            </div>
          </div>

          {footerSections.map((section) => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 VK Learning. All rights reserved.</p>
          <p>Digital learning platform with secure online payments.</p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------- Small Reusable Components ----------------- */

function FooterColumn({ title, links }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-slate-300">
        {links.map((link, i) => (
          <li key={`${title}-${link.label}-${i}`}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex transition hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="inline-flex transition hover:text-white">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm text-white/80 transition hover:-translate-y-0.5 hover:bg-sky-500 hover:text-white">
      {children}
    </div>
  );
}

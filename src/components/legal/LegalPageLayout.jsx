import Link from "next/link";

export default function LegalPageLayout({
  badge = "VK Learning",
  title,
  summary,
  updatedAt,
  highlights = [],
  children,
  primaryAction,
  secondaryAction,
  footerNote,
}) {
  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-700">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#eff6ff_35%,#f8fafc_75%)]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
            <div className="border-b border-slate-200 pb-8">
              <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                {badge}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {summary}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700">
                  Last updated on {updatedAt}
                </span>
                <span className="rounded-full bg-emerald-50 px-4 py-2 font-medium text-emerald-700">
                  VK Legal Policy
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-8">{children}</div>

            {(primaryAction || secondaryAction) && (
              <div className="mt-10 flex flex-wrap gap-4 border-t border-slate-200 pt-8">
                {primaryAction ? (
                  <Link
                    href={primaryAction.href}
                    className="inline-flex rounded-full bg-[#1C4ED8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163EB8]"
                  >
                    {primaryAction.label}
                  </Link>
                ) : null}
                {secondaryAction ? (
                  <Link
                    href={secondaryAction.href}
                    className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    {secondaryAction.label}
                  </Link>
                ) : null}
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Overview
              </p>
              <ul className="mt-5 space-y-3">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {footerNote ? (
              <div className="rounded-[1.75rem] border border-sky-100 bg-sky-50 p-6">
                <p className="text-sm leading-7 text-slate-600">{footerNote}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 md:p-7">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-4 space-y-5 text-base leading-8 text-slate-600">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base leading-8 text-slate-600"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

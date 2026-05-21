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
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 🌌 HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1B3A] via-[#102A5C] to-[#163A7A] py-16 sm:py-20 md:py-24 text-white">
        {/* Background Mesh Glows */}
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#EABF56]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-5 h-72 w-72 rounded-full bg-[#60A5FA]/15 blur-3xl pointer-events-none" />
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EABF56] backdrop-blur-sm">
            <svg className="h-3.5 w-3.5 text-[#EABF56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {badge}
          </span>
          
          <h1 className="mt-5 text-[28px] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h1>
          
          <p className="mt-4 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-blue-100/90">
            {summary}
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white/90 backdrop-blur-sm border border-white/10">
              <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Last updated: {updatedAt}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 font-medium text-emerald-300 backdrop-blur-sm border border-emerald-500/20">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              VK Official Policy
            </span>
          </div>
        </div>
      </section>

      {/* 📂 CONTENT SECTION */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-16 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] items-start">
          
          {/* Main Card Container */}
          <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(8,22,47,0.04)]">
            <div className="space-y-8 sm:space-y-10">{children}</div>

            {/* Actions Footer */}
            {(primaryAction || secondaryAction) && (
              <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 border-t border-gray-100 pt-8">
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="inline-flex items-center justify-center rounded-xl bg-[#1E40E6] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-500/10"
                  >
                    {primaryAction.label}
                  </Link>
                )}
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#0F172A] transition hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {highlights && highlights.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_15px_35px_rgba(8,22,47,0.03)]">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-xl bg-[#1E40E6]/5 border border-[#1E40E6]/10 px-4 py-3 text-xs sm:text-sm text-[#1E40E6] font-medium"
                    >
                      <svg className="h-4 w-4 text-[#1E40E6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {footerNote && (
              <div className="rounded-2xl border border-blue-50 bg-gradient-to-br from-blue-50/50 to-indigo-50/20 p-6">
                <div className="flex gap-3">
                  <svg className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {footerNote}
                  </p>
                </div>
              </div>
            )}
          </aside>
          
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="group rounded-2xl border border-gray-50 bg-[#F8FAFC]/70 p-5 sm:p-6 md:p-8 transition-all duration-300 hover:border-blue-100 hover:bg-white hover:shadow-[0_12px_30px_rgba(30,64,230,0.02)]">
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] pl-3.5 border-l-4 border-[#1E40E6]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3.5 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-100/70"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5 shadow-sm">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-600">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

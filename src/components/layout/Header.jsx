export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#F5F7FC]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="size-16" />

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm text-[#475569] font-semibold">
          <a href="#" className="hover:text-[#1C4ED8] transition">Home</a>
          <a href="#" className="text-[#1C4ED8]">Courses</a>
          <a href="#" className="hover:text-[#1C4ED8] transition">Tax Planning</a>
          <a href="#" className="hover:text-[#1C4ED8] transition">Features</a>
          <a href="#" className="hover:text-[#1C4ED8] transition">Contact</a>
        </nav>

        {/* CTA */}
        <button className="bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
          Get Started
        </button>
      </div>
    </header>
  );
}

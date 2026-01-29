import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
       <img src="/logo.svg" alt="" className="size-16" />
          </div>

          <p className="text-sm text-white/70 mt-4 leading-relaxed">
            Your trusted platform for learning and growth. 
            Transform your career with expert-led courses in 
            Tax, Accounting, and Finance.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <SocialIcon><FaFacebookF /></SocialIcon>
            <SocialIcon><FaTwitter /></SocialIcon>
            <SocialIcon><FaLinkedinIn /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
          </div>
        </div>

        {/* Quick Links */}
        <FooterColumn
          title="Quick Links"
          links={["Home", "Courses", "Features", "Contact"]}
        />

        {/* Resources */}
        <FooterColumn
          title="Resources"
          links={["Help Center", "Documentation", "Community", "Blog"]}
        />

        {/* Legal */}
        <FooterColumn
          title="Legal"
          links={["Privacy Policy", "Terms of Service", "Licenses", "Security"]}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

     
   
    </footer>
  );
}

/* ----------------- Small Reusable Components ----------------- */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-lg mb-4">{title}</h4>
      <ul className="space-y-3 text-sm text-white/70">
        {links.map((link, i) => (
          <li
            key={i}
            className="hover:text-white cursor-pointer transition"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 transition cursor-pointer">
      {children}
    </div>
  );
}

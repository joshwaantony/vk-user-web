import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with VK Accountancy for course enquiries, support, and learning-related assistance.",
  path: "/contact",
  keywords: [
    "contact vk accountancy",
    "course enquiry",
    "learning support",
  ],
});

export default function ContactUs() {
  return (
    <section className="w-full">
      <ContactHero />
      <ContactForm />
    </section>
  );
}

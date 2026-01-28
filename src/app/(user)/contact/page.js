import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";

export default function ContactUs() {
  return (
    <section className="w-full">
      <ContactHero />
      <ContactForm />
    </section>
  );
}
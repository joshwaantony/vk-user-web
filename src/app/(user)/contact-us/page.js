import LegalPageLayout, {
  LegalSection,
} from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Contact Us | VK Learning",
  description:
    "Legal and payment contact information for V K Accountancy Easy Learning Model Private Limited.",
};

export default function ContactUsPolicyPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      summary="Legal and payment contact details for V K ACCOUNTANCY EASY LEARNING MODEL PRIVATE LIMITED."
      updatedAt="March 23rd 2026"
      highlights={[
        "Merchant legal entity details",
        "Registered and operational address included",
        "Direct phone contact available",
      ]}
      primaryAction={{ href: "/contact", label: "Open Main Contact Page" }}
      secondaryAction={{ href: "/privacy-policy", label: "Read Privacy Policy" }}
      footerNote="This page presents VK Learning's merchant and operational contact details in the same legal layout used across all policy pages."
    >
      <LegalSection title="Contact Information">
        <p>You may contact us using the information below:</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Merchant Legal Entity
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              V K ACCOUNTANCY EASY LEARNING MODEL PRIVATE LIMITED
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Telephone
            </p>
            <a
              href="tel:9447791106"
              className="mt-3 inline-flex text-lg font-semibold text-[#1C4ED8] underline underline-offset-4"
            >
              9447791106
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Registered Address
            </p>
            <p className="mt-3 text-base leading-8 text-slate-600">
              APARNA, ATHITHARA TEMPLE ROAD, Pazhaveedu, Ambalapuzha,
              Alappuzha - 688009, Kerala
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Operational Address
            </p>
            <p className="mt-3 text-base leading-8 text-slate-600">
              APARNA, ATHITHARA TEMPLE ROAD, Pazhaveedu, Ambalapuzha,
              Alappuzha - 688009, Kerala
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Note">
        <p className="text-sm italic text-slate-500">
          Disclaimer: This content is adapted for VK Learning based on the
          merchant compliance contact page format.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

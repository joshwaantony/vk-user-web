import LegalPageLayout, {
  LegalList,
  LegalSection,
} from "@/components/legal/LegalPageLayout";

const collectedInformation = [
  "Name",
  "Contact information including email address",
  "Demographic information such as postcode, preferences, and interests, where relevant",
  "Other information relevant to customer surveys, support requests, and offers",
];

const usagePoints = [
  "Internal record keeping.",
  "We may use the information to improve our products and services.",
  "We may periodically send promotional emails about new products, special offers, or other information which we think you may find interesting using the email address you have provided.",
  "From time to time, we may also use your information to contact you for market research purposes by email, phone, or mail.",
  "We may use the information to customise the website according to your interests.",
];

const controlPoints = [
  "Whenever you are asked to fill in a form on the website, look for the option that lets you choose whether your information can be used for direct marketing purposes.",
  "If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us.",
];

export const metadata = {
  title: "Privacy Policy | VK Learning",
  description:
    "Privacy policy for VK Learning covering personal information, cookies, security, and user controls.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      summary="This policy explains how VK Learning collects, uses, protects, and manages personal information across the platform."
      updatedAt="March 23rd 2026"
      highlights={[
        "Covers account, contact, and purchase data",
        "Explains cookies and website analytics",
        "Includes user control over personal information",
      ]}
      primaryAction={{ href: "/contact", label: "Contact VK Support" }}
      secondaryAction={{ href: "/terms-and-conditions", label: "Read Terms" }}
      footerNote="This page is styled as part of the VK Learning legal experience and follows the same visual system as the rest of the product."
    >
      <LegalSection title="Overview">
        <p>
          This privacy policy sets out how VK Learning uses and protects any
          information that you give us when you use this website, create an
          account, contact us, or purchase from us.
        </p>
        <p>
          VK Learning is committed to ensuring that your privacy is protected.
          If we ask you to provide information by which you can be identified
          when using this website, you can be assured that it will only be used
          in accordance with this privacy statement.
        </p>
        <p>
          VK Learning may change this policy from time to time by updating this
          page. You should check this page periodically to ensure that you are
          comfortable with any changes.
        </p>
      </LegalSection>

      <LegalSection title="Information We May Collect">
        <LegalList items={collectedInformation} />
      </LegalSection>

      <LegalSection title="How We Use The Information">
        <p>
          We require this information to understand your needs and provide you
          with a better service, and in particular for the following reasons:
        </p>
        <LegalList items={usagePoints} />
      </LegalSection>

      <LegalSection title="Cookies And Security">
        <p>
          We are committed to ensuring that your information is secure. In
          order to prevent unauthorised access or disclosure, we have put in
          place suitable physical, electronic, and managerial procedures to
          safeguard and secure the information we collect online.
        </p>
        <p>
          A cookie is a small file which asks permission to be placed on your
          computer&apos;s hard drive. Once you agree, the file is added and the
          cookie helps analyse web traffic or lets you know when you visit a
          particular site. Cookies allow web applications to respond to you as
          an individual by gathering and remembering information about your
          preferences.
        </p>
        <p>
          We use traffic log cookies to identify which pages are being used.
          This helps us analyse data about webpage traffic and improve our
          website in order to tailor it to customer needs.
        </p>
        <p>
          You can choose to accept or decline cookies. Most web browsers
          automatically accept cookies, but you can usually modify your browser
          setting to decline cookies if you prefer.
        </p>
      </LegalSection>

      <LegalSection title="Controlling Your Personal Information">
        <p>
          You may choose to restrict the collection or use of your personal
          information in the following ways:
        </p>
        <LegalList items={controlPoints} />
        <p>
          We will not sell, distribute, or lease your personal information to
          third parties unless we have your permission or are required by law
          to do so.
        </p>
        <p>
          If you believe that any information we are holding on you is
          incorrect or incomplete, please write to us or contact us as soon as
          possible at{" "}
          <a
            href="mailto:support@vk.com"
            className="font-semibold text-slate-900 underline underline-offset-4"
          >
            support@vk.com
          </a>
          .
        </p>
        <p className="text-sm italic text-slate-500">
          Disclaimer: This content is adapted for VK Learning based on the
          privacy policy structure used for Razorpay merchant compliance.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

import LegalPageLayout, {
  LegalList,
  LegalSection,
} from "@/components/legal/LegalPageLayout";

const termsPoints = [
  "The content of the pages of this website is subject to change without notice.",
  "VK Learning does not provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and VK Learning expressly excludes liability for any such inaccuracies or errors to the fullest extent permitted by law.",
  "Your use of any information or materials on this website and/or product pages is entirely at your own risk, for which VK Learning shall not be liable. It is your responsibility to ensure that any products, services, or information available through this website meet your specific requirements.",
  "This website contains material that is owned by or licensed to VK Learning. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited except in accordance with applicable copyright and legal requirements.",
  "All trademarks reproduced on this website that are not the property of, or licensed to, VK Learning are acknowledged on the website.",
  "Unauthorized use of information provided by VK Learning may give rise to a claim for damages and/or be a criminal offence.",
  "From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.",
  "You may not create a link to this website from another website or document without prior written consent from VK Learning.",
  "Any dispute arising out of use of this website and/or purchase from VK Learning and/or any engagement with VK Learning is subject to the laws of India.",
  "VK Learning shall not be liable for any loss or damage arising directly or indirectly out of the decline of authorization for any transaction because the cardholder has exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.",
];

export const metadata = {
  title: "Terms & Conditions | VK Learning",
  description: "Terms and conditions for using VK Learning and making purchases on the platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      summary="These terms define the conditions for using VK Learning, accessing our courses, and completing purchases on the platform."
      updatedAt="March 23rd 2026"
      highlights={[
        "Applies to platform access and purchases",
        "Use of VK content is subject to legal restrictions",
        "Disputes are governed by the laws of India",
      ]}
      primaryAction={{ href: "/contact", label: "Contact VK Support" }}
      secondaryAction={{ href: "/privacy-policy", label: "Read Privacy Policy" }}
      footerNote="This page is adapted to match VK Learning's legal policy structure and design language."
    >
      <LegalSection title="Who These Terms Apply To">
        <p>
          For the purpose of these Terms & Conditions, the terms "we", "us",
          and "our" refer to VK Learning and its platform, services, products,
          and official support channels.
        </p>
        <p>
          The terms "you", "your", "user", and "visitor" refer to any natural
          or legal person who visits this website, registers on the platform,
          or purchases from us.
        </p>
      </LegalSection>

      <LegalSection title="Use Of Website And Services">
        <p>
          Your use of the website and/or purchase from us is governed by the
          following Terms & Conditions:
        </p>
        <LegalList items={termsPoints} />
      </LegalSection>

      <LegalSection title="Support">
        <p>
          Payment and policy support:{" "}
          <a
            href="mailto:support@vk.com"
            className="font-semibold text-slate-900 underline underline-offset-4"
          >
            support@vk.com
          </a>
        </p>
        <p className="text-sm italic text-slate-500">
          Disclaimer: This content is adapted for VK Learning based on the
          payment policy structure used for Razorpay merchant compliance.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

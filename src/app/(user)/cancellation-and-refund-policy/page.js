import LegalPageLayout, {
  LegalList,
  LegalSection,
} from "@/components/legal/LegalPageLayout";

const policyPoints = [
  "All purchases made on VK Learning are final.",
  "VK Learning does not provide cancellation of orders, course enrollments, subscriptions, or digital access once payment has been completed.",
  "VK Learning does not provide refunds for any paid products, services, digital content, course fees, subscription plans, or access packages purchased through the platform.",
  "Users are advised to review course details, pricing, eligibility, and platform information carefully before making a payment.",
  "If a payment is successfully processed, the transaction will be treated as confirmed and non-cancellable.",
  "No refund will be issued for partial use, non-usage, mistaken purchase, change of mind, or failure to complete a course or service after purchase.",
  "In the event of a technical payment issue such as duplicate payment, the matter may be reviewed only for payment reconciliation and not as a cancellation or refund request.",
  "Any approved correction related to duplicate payment or failed transaction reconciliation, if applicable, will be handled only after internal verification by VK Learning and the payment gateway records.",
];

export const metadata = {
  title: "Cancellation & Refund Policy | VK Learning",
  description:
    "Cancellation and refund policy for VK Learning. VK Learning does not offer cancellations or refunds.",
};

export default function CancellationAndRefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Cancellation & Refund Policy"
      summary="VK Learning sells digital learning access. Purchases are final, and the platform does not offer cancellations or refunds after payment."
      updatedAt="March 23rd 2026"
      highlights={[
        "All purchases are final",
        "No cancellation after successful payment",
        "No refund for non-usage or change of mind",
      ]}
      primaryAction={{ href: "/contact", label: "Contact VK Support" }}
      secondaryAction={{ href: "/contact-us", label: "View Legal Contact" }}
      footerNote="This page is adapted to VK Learning's no-cancellation and no-refund policy requirements."
    >
      <LegalSection title="Policy Summary">
        <p>
          VK Learning provides digital products and services. Because access to
          digital content is provisioned after successful payment, VK Learning
          does not offer cancellations or refunds.
        </p>
        <p>
          By making a purchase on VK Learning, you acknowledge and agree to the
          following policy:
        </p>
        <LegalList items={policyPoints} />
      </LegalSection>

      <LegalSection title="Support">
        <p>
          If you have a payment-related concern, you can contact VK support at{" "}
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
          Razorpay merchant policy format, with VK-specific no-cancellation and
          no-refund terms.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}



"use client";

import React from "react";
import PhoneForm from "@/components/auth/PhoneForm";
import { useAuthFlowStore } from "@/store/authFlow.store";

export default function Page() {
  const { title, subtitle, purpose } = useAuthFlowStore();

  return (
    <PhoneForm
      title={title}
      subtitle={subtitle}
      purpose={purpose}
      nextRoute="/phone/verify"
    />
  );
}

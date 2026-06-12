import type { Metadata } from "next";
import { Suspense } from "react";
import ApplyClient from "./ApplyClient";

export const metadata: Metadata = {
  title: "Apply for Installment — KServico",
  description: "Apply for 0% installment financing at KServico. No bank needed — get approved in 1-2 business days.",
};

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyClient />
    </Suspense>
  );
}

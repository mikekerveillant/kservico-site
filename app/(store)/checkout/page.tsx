import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — KServico",
  description: "Complete your KServico order.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

import type { Metadata } from "next";
import StoreLocatorClient from "./StoreLocatorClient";

export const metadata: Metadata = {
  title: "Find a Branch — KServico",
  description: "Find a KServico branch near you. 180+ branches across Luzon.",
};

export default function StoresPage() {
  return <StoreLocatorClient />;
}

import UtilityBar from "@/components/layout/UtilityBar";
import Navbar from "@/components/layout/Navbar";
import PaymentBar from "@/components/layout/PaymentBar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import StoreHydration from "@/components/StoreHydration";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHydration />
      <UtilityBar />
      <Navbar />
      <PaymentBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartSidebar />
    </>
  );
}

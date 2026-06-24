import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — KServico",
  description: "KServico Online Store Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with the Philippine Data Privacy Act of 2012.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="bg-[#1A1A1A] py-10">
        <div className="max-w-[820px] mx-auto px-5">
          <h1 className="font-display text-[36px] font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-white/60 text-[13px] mt-1">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-[820px] mx-auto px-5 py-10 space-y-8">

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">1. Introduction</h2>
          <p className="text-[14px] text-[#555] leading-relaxed">
            KServico (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our online store, or interact with our virtual assistant Kai. This policy is in compliance with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and its Implementing Rules and Regulations.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">2. Information We Collect</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-3">We may collect the following types of personal information:</p>
          <ul className="space-y-2 text-[14px] text-[#555]">
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Identity information</strong> — full name, date of birth, and valid government-issued ID details when applying for installment financing.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Contact information</strong> — email address and mobile or telephone number.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Financial information</strong> — employment details, proof of income, and proof of billing for installment applications.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Chat records</strong> — messages exchanged with our virtual assistant Kai and our live support team.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Usage data</strong> — pages visited, products viewed, and browsing behaviour on our website.</span></li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">3. How We Use Your Information</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-3">We use the information we collect to:</p>
          <ul className="space-y-2 text-[14px] text-[#555]">
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span>Process and manage installment financing applications.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span>Provide customer support and respond to enquiries via chat or phone.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span>Follow up on abandoned enquiries or incomplete applications.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span>Send you product recommendations, promotions, and updates (with your consent).</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span>Improve our website, products, and services.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span>Comply with legal and regulatory obligations.</span></li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">4. Sharing of Information</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-3">We do not sell your personal information. We may share it only with:</p>
          <ul className="space-y-2 text-[14px] text-[#555]">
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Financing partners and banks</strong> — to process your installment application.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Service providers</strong> — trusted third parties who assist us in operating our website and business (e.g. cloud hosting, analytics), bound by confidentiality agreements.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Government and regulatory authorities</strong> — when required by law or legal process.</span></li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">5. Data Retention</h2>
          <p className="text-[14px] text-[#555] leading-relaxed">
            We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Installment application records are retained for a minimum of five (5) years in compliance with Philippine financial regulations. Chat records are retained for up to two (2) years for quality assurance and dispute resolution purposes.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">6. Data Security</h2>
          <p className="text-[14px] text-[#555] leading-relaxed">
            We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These include encrypted data transmission (HTTPS), access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">7. Your Rights Under the Data Privacy Act of 2012</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-3">As a data subject, you have the right to:</p>
          <ul className="space-y-2 text-[14px] text-[#555]">
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Access</strong> — request a copy of your personal data held by us.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Correction</strong> — request corrections to inaccurate or incomplete data.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Erasure or blocking</strong> — request deletion or restriction of your data where processing is unlawful.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Object</strong> — object to processing of your personal data for direct marketing.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Data portability</strong> — obtain a copy of your data in a structured, commonly used format.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold flex-shrink-0">•</span><span><strong className="text-[#1A1A1A]">Lodge a complaint</strong> — file a complaint with the National Privacy Commission (NPC) at <strong>privacy.gov.ph</strong>.</span></li>
          </ul>
          <p className="text-[14px] text-[#555] mt-3">To exercise any of these rights, please contact us using the details below.</p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">8. Cookies</h2>
          <p className="text-[14px] text-[#555] leading-relaxed">
            Our website uses cookies and similar technologies to enhance your browsing experience and analyse site traffic. You may disable cookies through your browser settings; however, this may affect the functionality of certain features on our site.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">9. Changes to This Policy</h2>
          <p className="text-[14px] text-[#555] leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-[#EFEFEF]">
          <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-3">10. Contact Us</h2>
          <p className="text-[14px] text-[#555] leading-relaxed mb-2">
            If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us:
          </p>
          <div className="text-[14px] text-[#555] space-y-1">
            <p><strong className="text-[#1A1A1A]">KServico Online Store</strong></p>
            <p>Email: <a href="mailto:sales@kservico.com.ph" className="text-[#C8102E] no-underline hover:underline">sales@kservico.com.ph</a></p>
            <p>Website: <a href="https://kservico.com.ph" className="text-[#C8102E] no-underline hover:underline">kservico.com.ph</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}

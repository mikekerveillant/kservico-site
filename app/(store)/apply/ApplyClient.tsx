"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { DEFAULT_FORM, STEPS, type ApplyFormData } from "./types";
import Step1ProductBranch from "./steps/Step1ProductBranch";
import Step2Personal from "./steps/Step2Personal";
import Step3Employment from "./steps/Step3Employment";
import Step4Documents from "./steps/Step4Documents";
import Step5Review from "./steps/Step5Review";

function generateReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `KSV-${year}-${rand}`;
}

function isStepValid(step: number, form: ApplyFormData): boolean {
  switch (step) {
    case 0:
      return Boolean(form.productId && form.branchId);
    case 1:
      return Boolean(
        form.lastName.trim() &&
          form.firstName.trim() &&
          form.birthday &&
          form.gender &&
          form.civilStatus &&
          form.nationality.trim() &&
          form.presentAddress.trim() &&
          form.cellularNo.trim() &&
          form.email.trim()
      );
    case 2:
      if (!form.employmentType || !form.grossIncome) return false;
      if (form.employmentType === "employed") {
        return Boolean(form.employerName && form.position && form.employmentStatus && form.employerAddress && form.employerContact && form.yearsConnected);
      }
      if (form.employmentType === "business") {
        return Boolean(form.employerName && form.natureOfBusiness && form.employerAddress && form.employerContact && form.yearsConnected);
      }
      return Boolean(form.employerName && form.employerAddress);
    case 3:
      return Boolean(
        form.proofOfIncomeType && form.proofOfIncomeFile &&
        form.proofOfBillingType && form.proofOfBillingFile &&
        form.idType && form.idFile
      );
    default:
      return true;
  }
}

export default function ApplyClient() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<ApplyFormData>(DEFAULT_FORM);
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      setForm((f) => ({ ...f, productId }));
    }
  }, [searchParams]);

  function update<K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleNext() {
    if (!isStepValid(step, form)) return;
    if (step === STEPS.length - 1) {
      setReference(generateReference());
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  if (reference) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-5 py-16">
        <div className="bg-white border border-[#EFEFEF] rounded-2xl p-8 max-w-[460px] text-center">
          <CheckCircle2 size={56} className="mx-auto mb-4 text-[#1AA84B]" />
          <h1 className="font-display text-[24px] font-black text-[#1A1A1A] mb-2">
            Application Submitted!
          </h1>
          <p className="text-[14px] text-[#555] mb-1">Your reference number is</p>
          <p className="font-display text-[20px] font-black text-[#C8102E] mb-5">{reference}</p>
          <p className="text-[13px] text-[#999] mb-6">
            Hi {form.firstName}! Your KServico installment application has been received.
            Our team will review it within 1-2 business days. We&apos;ll send updates to{" "}
            <strong className="text-[#555]">{form.email}</strong> and{" "}
            <strong className="text-[#555]">{form.cellularNo}</strong>.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/"
              className="block w-full bg-[#C8102E] text-white text-center py-3.5 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#a00d24] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="block w-full text-center py-3 text-[13px] font-semibold text-[#555] no-underline hover:text-[#C8102E] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-[#C8102E] py-10">
        <div className="max-w-[800px] mx-auto px-5">
          <h1 className="font-display text-[32px] font-black text-white tracking-tight mb-1">
            Apply for Installment
          </h1>
          <p className="text-white/75 text-[14px]">
            0% interest · No bank needed · Approval in 1-2 business days
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 py-8">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-[13px] transition-colors ${
                    i < step
                      ? "bg-[#1AA84B] text-white"
                      : i === step
                      ? "bg-[#C8102E] text-white"
                      : "bg-white border-2 border-[#EFEFEF] text-[#999]"
                  }`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold text-center hidden sm:block ${i === step ? "text-[#C8102E]" : "text-[#999]"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-[2px] mx-1 ${i < step ? "bg-[#1AA84B]" : "bg-[#EFEFEF]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white border border-[#EFEFEF] rounded-2xl p-6 mb-5">
          {step === 0 && <Step1ProductBranch form={form} update={update} />}
          {step === 1 && <Step2Personal form={form} update={update} />}
          {step === 2 && <Step3Employment form={form} update={update} />}
          {step === 3 && <Step4Documents form={form} update={update} />}
          {step === 4 && <Step5Review form={form} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-display font-black text-[13px] text-[#555] border-2 border-[#EFEFEF] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!isStepValid(step, form)}
            className="flex items-center gap-1.5 px-6 py-3 rounded-xl font-display font-black text-[14px] bg-[#C8102E] text-white hover:bg-[#a00d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === STEPS.length - 1 ? "Submit Application" : "Continue"}
            {step < STEPS.length - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

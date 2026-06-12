import type { EmploymentType } from "@/types";

export interface ApplyFormData {
  // Step 1 — Product & Branch
  productId: string;
  branchId: string;
  termMonths: number;

  // Step 2 — Personal Information
  lastName: string;
  firstName: string;
  middleName: string;
  birthday: string;
  gender: string;
  civilStatus: string;
  nationality: string;
  presentAddress: string;
  cellularNo: string;
  telNo: string;
  email: string;

  // Step 3 — Employment & Income
  employmentType: EmploymentType | "";
  employerName: string;
  natureOfBusiness: string;
  employerAddress: string;
  employerContact: string;
  position: string;
  employmentStatus: string;
  yearsConnected: string;
  grossIncome: string;

  // Step 4 — Documents
  proofOfIncomeType: string;
  proofOfIncomeFile: File | null;
  proofOfBillingType: string;
  proofOfBillingFile: File | null;
  idType: string;
  idFile: File | null;
}

export const DEFAULT_FORM: ApplyFormData = {
  productId: "",
  branchId: "",
  termMonths: 12,

  lastName: "",
  firstName: "",
  middleName: "",
  birthday: "",
  gender: "",
  civilStatus: "",
  nationality: "Filipino",
  presentAddress: "",
  cellularNo: "",
  telNo: "",
  email: "",

  employmentType: "",
  employerName: "",
  natureOfBusiness: "",
  employerAddress: "",
  employerContact: "",
  position: "",
  employmentStatus: "",
  yearsConnected: "",
  grossIncome: "",

  proofOfIncomeType: "",
  proofOfIncomeFile: null,
  proofOfBillingType: "",
  proofOfBillingFile: null,
  idType: "",
  idFile: null,
};

export const STEPS = [
  "Product & Branch",
  "Personal Info",
  "Employment",
  "Documents",
  "Review",
];

export function calculateAge(birthday: string): number | null {
  if (!birthday) return null;
  const dob = new Date(birthday);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

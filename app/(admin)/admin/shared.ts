import type { ApplicationStatus } from "@/types";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  disbursed: "Disbursed",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: "bg-[#FEF3C7] text-[#92400E]",
  under_review: "bg-[#DBEAFE] text-[#1E40AF]",
  approved: "bg-[#D1FAE5] text-[#065F46]",
  rejected: "bg-[#FEE2E2] text-[#991B1B]",
  disbursed: "bg-[#E0E7FF] text-[#3730A3]",
};

export const STATUSES: ApplicationStatus[] = ["pending", "under_review", "approved", "rejected", "disbursed"];

export interface ApplicationRow {
  id: string;
  reference: string;
  status: ApplicationStatus;
  product_id: string;
  product_name: string;
  product_price: number;
  term_months: number;
  branch_id: string;
  branch_name: string;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  birthday: string;
  gender: string;
  civil_status: string;
  nationality: string;
  present_address: string;
  cellular_no: string;
  tel_no: string | null;
  email: string;
  employment_type: string;
  employer_name: string;
  nature_of_business: string | null;
  employer_address: string;
  employer_contact: string;
  position: string | null;
  employment_status: string | null;
  years_connected: string;
  gross_income: number;
  proof_of_income_type: string;
  proof_of_income_path: string;
  proof_of_billing_type: string;
  proof_of_billing_path: string;
  id_type: string;
  id_path: string;
  created_at: string;
}

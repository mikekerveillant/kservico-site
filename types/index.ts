export type ProductCategory =
  | "aircon"
  | "tv"
  | "washer"
  | "fridge"
  | "gas-range"
  | "motorcycle"
  | "ebike"
  | "three-wheeler"
  | "smartphone"
  | "laptop"
  | "furniture"
  | "audio"
  | "small-appliance"
  | "gadget";

export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "disbursed";

export type EmploymentType = "employed" | "business" | "ofw" | "farming";

export type StaffRole =
  | "branch_staff"
  | "branch_manager"
  | "head_office"
  | "super_admin";

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  original_price?: number;
  description?: string;
  features: string[];
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  stock_qty: number;
  specifications?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface Branch {
  id: string;
  name: string;
  region: string;
  address: string;
  city: string;
  province: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  is_active?: boolean;
}

export interface Application {
  id: string;
  reference_no: string;
  status: ApplicationStatus;
  branch_id: string;
  branch?: Branch;
  product_id?: string;
  product_name: string;
  product_price: number;
  term_months: number;
  monthly_payment: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  birthday: string;
  age?: number;
  nationality: string;
  gender?: string;
  civil_status?: string;
  present_address: string;
  cellular_no: string;
  tel_no?: string;
  email: string;
  employment_type?: EmploymentType;
  employer_name?: string;
  nature_of_business?: string;
  employer_address?: string;
  employer_contact?: string;
  employment_status?: string;
  position?: string;
  gross_income?: number;
  years_connected?: number;
  proof_of_income_url?: string;
  proof_of_income_type?: string;
  proof_of_billing_url?: string;
  proof_of_billing_type?: string;
  id_url?: string;
  id_type?: string;
  admin_notes?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at?: string;
}

export interface Staff {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  role: StaffRole;
  branch_id?: string;
  branch?: Branch;
  is_active: boolean;
}

export interface ApplicationEvent {
  id: string;
  application_id: string;
  event_type: "status_change" | "note_added" | "document_uploaded";
  old_status?: ApplicationStatus;
  new_status?: ApplicationStatus;
  note?: string;
  created_by?: string;
  staff?: Staff;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

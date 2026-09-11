export type UserRole =
  | 'super_admin'
  | 'head_office'
  | 'regional_management'
  | 'district_franchise'
  | 'school_chain_head_office'
  | 'school_institution'
  | 'vendor'
  | 'wholesale_vendor'
  | 'wholesale_buyer'
  | 'student';

export interface CurrentUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  role: UserRole;
  status: 'pending_verification' | 'active' | 'suspended' | 'blocked';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isPasswordSet: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type StudentGender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type SmartCardStatus = 'active' | 'expired' | 'lost' | 'blocked' | 'replaced';

export interface StudentProfile {
  id: string;
  userId: string;
  studentIdNumber: string;
  photoUrl: string | null;
  dateOfBirth: string | null;
  gender: StudentGender | null;
  institutionId: string | null;
  districtId: string | null;
  regionId: string | null;
  externalHolderType: string | null;
  externalInstitutionName: string | null;
  externalSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SmartCard {
  id: string;
  studentProfileId: string;
  cardNumber: string;
  qrToken: string;
  status: SmartCardStatus;
  replacesCardId: string | null;
  issuedAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

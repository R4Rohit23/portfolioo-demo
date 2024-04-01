export interface ArtistData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  title?: string;
  description?: string;
  phoneNumber?: string;
  location?: string;
  pricing?: {
    weekly: number;
    monthly: number;
    hourly: number;
  };
  skills?: string[];
  socialLinks?: { appName: string; link: string }[];
  accountType: string;
  profileImage: string;
  isAdminVerified?: boolean;
  createdAt: Date;
}

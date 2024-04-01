export interface IInvite {
  _id: string;
  message: string;
  priority: boolean;
  state: string;
  isSeen: boolean;
  isPinned: boolean;
  client: {
    companyLocation: string;
    companyName: string;
    companySize: number;
    companyWebsite: string;
    companyPhone: string;
    industry: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      profileImage?: string;
      isAdminVerified: boolean;
    };
  };
}

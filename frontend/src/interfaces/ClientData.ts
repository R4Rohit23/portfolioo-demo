export interface ClientData {
  clientType: "Company" | "Individual";
  companyName: string;
  companyWebsite: string;
  companySocialLinks: string[];
  industry: string;
  companySize: number;
  companyLocation: string;
  companyEmail: string;
  companyPhone: string;
  companyDescription: string;
}

export interface IGigCard {
  _id: string;
  client?: {
    userId?: string;
    companyName?: string;
    companyWebsite?: string;
    companySocialLinks?: string[];
    industry?: string;
    companySize?: number;
    companyLocation?: string;
    userDetails: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      profileImage: string;
      isAdminVerified: boolean;
    };
  };
  title: string;
  description: string;
  skillsRequired: string[];
  deadline: string;
  jobLevel: "entry" | "intermediate" | "expert";
  scopeOfWork: string;
  mediaFiles: string[];
  fixedBudget?: number;
  hourlyBudgetRange?: {
    from: number;
    to: number;
  };
  createdAt?: Date;
}

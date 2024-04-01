export interface JobData {
    title: string;
    description: string;
    skillsRequired: string[];
    projectSize: string;
    deadline: Date;
    levelOfExperience: "entry" | "intermediate" | "expert";
    budgetType: "hourly" | "fixed";
    hourlyBudget?: {
        from?: number;
        to?: number;
    };
    fixedBudget?: number;
    mediaFiles?: [string];
    status?: 'InProgress' | "Completed" | "Pending";
    projectRequirements?: string[];
}
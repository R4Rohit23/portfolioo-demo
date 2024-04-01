import { ClientData } from "./ClientData";
import { ArtistData } from "./UserData";

export interface IPropSteps {
  data: any;
  setData: (values: any) => void;
  prevStep?(): any;
  nextStep?(): any;
  isPassword?: boolean;
  isNavigate?: boolean;
  handleNavigate?(): any;
  setCategories?: (values: string[]) => void;
  categories?: string[];
  handleUpdate?: (values: any) => void;
  currStep?: number;
  setCurrStep?: (value: number) => void;
  setIsLoginClick?: (value: boolean) => void;
  edit?: boolean;

  thumbnail?: string;
  isSubmit?: boolean;
  activeStep: number;
  totalSteps?: number;
  setActiveStep: (step: number) => void;
}

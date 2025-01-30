export interface IState {
  status: number;
  message: string;
  errors?: any;
}
export type IToken = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  email: string | null;
};

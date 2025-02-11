// for form state
export interface IState {
  status: number;
  message: string;
  errors?: any;
  data?: any;
}
// for email verification
export type IToken = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  email: string | null;
};

// next auth
import { ISODateString } from "next-auth";
export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};

type ClashForm = {
  title?: string;
  description?: string;
};

type ClashFormError = {
  title?: string;
  description?: string;
  expired_at?: string;
  image?: string;
};

type ClashType = {
  id: string;
  user_id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  expire_at: string;
  user: {
    name: string;
    email: string;
  };
  ClashItem?: Array<ClashItemType>;
  ClashComments?: Array<ClashCommentType>;
};
type ClashItemType = {
  id: string;
  image: string;
  count: number;
};
type ClashCommentType = {
  id: string;
  comment: string;
  created_at: string;
};
type ClashItemType = {
  image: File | null;
};

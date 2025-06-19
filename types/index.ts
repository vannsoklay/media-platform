import { SVGProps } from "react";
import { UserType } from "./user";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (values: LoginForm) => Promise<void>;
  register: (values: RegisterForm) => Promise<void>;
  logout: () => void;
  isLoginModalOpen: boolean,
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isPostModalOpen: boolean;
  setIsPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error: null | any
};

export type LoginForm = {
  username: string,
  password: string
}

export type RegisterForm = {
  username: string,
  password: string
}


// Define types for the comment data you get from useComment hook
export interface CommentResult {
  data: any[]; // Adjust this to your actual comment data type
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}
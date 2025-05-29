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
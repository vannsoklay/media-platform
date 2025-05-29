"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { addToast } from "@heroui/react";
import { UserService } from "@/services/user";
import { UserType } from "@/types/user";
import { AuthContextType, LoginForm } from "@/types";
import api from "@/config/interceptor";
import AuthModal from "@/components/modals/auth-modal";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      api
        .get(`/user`)
        .then((data) => {
          setUser(data.data);
        })
        .catch((e) => {
          setUser(null);
          if (e.code == "ERR_BAD_REQUEST") {
            return;
          }
          setError("Server is currently unavailable. Please try again later.");
          addToast({
            title: "Authentication",
            variant: "solid",
            description:
              "Server is currently unavailable. Please try again later.",
            color: "danger",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.7em"
                height="1.7em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
                />
              </svg>
            ),
          });
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchUser();
  }, []);

  const login = async (values: LoginForm) => {
    try {
      const data = await UserService.login(values);
      if (data.status == 200) {
        localStorage.setItem("access_token", data.data.access_token);
        setUser(data.data.user);
        setIsLoginModalOpen(false);
      }
    } catch (error: any) {
      addToast({
        title: "Authentication",
        variant: "solid",
        description: error.message,
        color: "danger",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.7em"
            height="1.7em"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
            />
          </svg>
        ),
      });
    }
  };

  const register = async (values: LoginForm) => {
    try {
      const data = await UserService.register(values);
      if (data.status == 200) {
        localStorage.setItem("access_token", data.data.access_token);
        setUser(data.data.user);
        setIsLoginModalOpen(false);
      }
    } catch (error: any) {
      addToast({
        title: "Authentication",
        variant: "solid",
        description: error.message,
        color: "danger",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.7em"
            height="1.7em"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
            />
          </svg>
        ),
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isPostModalOpen,
      setIsPostModalOpen,
      isLoginModalOpen,
      setIsLoginModalOpen,
      error,
    }),
    [user, loading, isPostModalOpen, isLoginModalOpen, error, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

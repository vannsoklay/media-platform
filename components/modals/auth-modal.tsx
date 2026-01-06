import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

import { useAuth } from "@/contexts/useAuth";
import { LoginForm, RegisterForm } from "@/types";

export default function AuthModal() {
  const { login, register, isLoginModalOpen, setIsLoginModalOpen } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (mode === "login") {
        await login({ ...data, type: "EMAIL" } as LoginForm);
        setMessage("Login successful!");
        setTimeout(() => {
          setIsLoginModalOpen(false);
        }, 1000);
      } else {
        await register(data as RegisterForm);
        setMode("login");
      }
    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      size="md"
      onOpenChange={setIsLoginModalOpen}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {mode === "login" ? "Login to Media" : "Register for Media"}
            </ModalHeader>
            <ModalBody>
              {message && <div className="text-sm text-red-500">{message}</div>}
              {mode == "register" && (
                <>
                  <Input
                    isRequired
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                  />

                  <Input
                    isRequired
                    label="Name"
                    labelPlacement="outside"
                    name="name"
                    placeholder="Enter your name"
                  />
                </>
              )}
              {mode == "login" ? (
                <Input
                  isRequired
                  label="Email"
                  labelPlacement="outside"
                  name="contact"
                  placeholder="Enter your email"
                />
              ) : (
                <Input
                  isRequired
                  label="Email"
                  labelPlacement="outside"
                  name="email"
                  placeholder="Enter your email"
                />
              )}

              <Input
                isRequired
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </ModalBody>
            <ModalFooter className="flex-col items-start gap-2">
              <div className="w-full flex justify-between">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setMessage(null);
                    setMode("login");
                  }}
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  {mode === "login" ? "Login" : "Register"}
                </Button>
              </div>
              <div className="w-full text-center text-sm text-default-500">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      className="text-blue-500 underline"
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setMessage(null);
                      }}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-blue-500 underline"
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setMessage(null);
                      }}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

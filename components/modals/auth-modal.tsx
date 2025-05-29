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
        await login(data as LoginForm);
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

              <Input
                isRequired
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
              />

              <Input
                isRequired
                label="Password"
                labelPlacement="outside"
                name="password"
                type="password"
                placeholder="Enter your password"
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
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-500 underline"
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
                      type="button"
                      className="text-blue-500 underline"
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

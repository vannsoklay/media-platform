"use client";
import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Avatar, toast } from "@heroui/react";
import { useAuth } from "@/contexts/useAuth";
import _ from "lodash";
import Link from "next/link";

export const Navbar = () => {
  const {
    user,
    logout,
    setIsLoginModalOpen,
    setIsPostModalOpen,
    loading,
    error,
  } = useAuth();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Navbar left side - brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            Hello World
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar right side */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex space-x-4">
          {loading && <span>Loading...</span>}

          {!loading && error && (
            <>
              <Button
                onPress={() => setIsLoginModalOpen(true)}
                color="primary"
                href="#"
                variant="flat"
              >
                Sign In
              </Button>
            </>
          )}

          {!loading &&
            !error &&
            (!_.isEmpty(user) ? (
              <>
                <Button
                  onPress={() => setIsPostModalOpen(true)}
                  color="primary"
                  variant="flat"
                >
                  Post
                </Button>
                <Link href={`${user.username}`}>
                  <Avatar
                    name={user?.username.charAt(0).toUpperCase()}
                    src={user?.avatar || ""}
                  />
                </Link>
                <Button
                  onPress={logout}
                  color="primary"
                  href="#"
                  variant="flat"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onPress={() => setIsLoginModalOpen(true)}
                  color="primary"
                  href="#"
                  variant="flat"
                >
                  Sign In
                </Button>
              </>
            ))}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

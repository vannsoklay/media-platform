"use client";
import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/react";
import _ from "lodash";
import Link from "next/link";

import { useAuth } from "@/contexts/useAuth";

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
    <HeroUINavbar isBordered maxWidth="xl" position="sticky">
      {/* Navbar left side - brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand>
          <Link className="flex items-center gap-2" href="/">
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
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginModalOpen(true)}
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
                  color="primary"
                  variant="flat"
                  onPress={() => setIsPostModalOpen(true)}
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
                  color="primary"
                  href="#"
                  variant="flat"
                  onPress={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  href="#"
                  variant="flat"
                  onPress={() => setIsLoginModalOpen(true)}
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

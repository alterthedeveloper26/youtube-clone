"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Bell, Plus, UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <Button className="rounded-full bg-light-gray-100 text-black">
          <Plus className="size-6" />
          Create
        </Button>
        <Button className="rounded-full size-10 p-0" variant="ghost">
          <Bell className="size-6" />
        </Button>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button
            variant={"outline"}
            className="rounded-full text-blue-700 px-4 py-2 font-medium hover:text-blue-700 hover:border-blue-100 hover:bg-blue-100"
          >
            <UserCircleIcon className="size-6" />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

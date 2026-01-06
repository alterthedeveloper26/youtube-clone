"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Bell, ClapperboardIcon, Plus, UserCircleIcon } from "lucide-react";
import Link from "next/link";

interface AuthButtonProps {
  isStudioAuthButton?: boolean;
}

export const AuthButton = ({ isStudioAuthButton }: AuthButtonProps) => {
  return (
    <>
      <SignedIn>
        {!isStudioAuthButton && (
          <Button asChild className="rounded-full bg-light-gray-100 text-black">
            <Link href="/studio">
              <Plus className="size-6" />
              Create
            </Link>
          </Button>
        )}
        <Button className="rounded-full size-10 p-0" variant="ghost">
          <Bell className="size-6" />
        </Button>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-3" />}
            />
          </UserButton.MenuItems>
        </UserButton>
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

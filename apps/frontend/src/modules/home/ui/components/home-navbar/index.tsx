"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Mic, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const HomeNavbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 h-1/6 items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center shrink-0">
          <SidebarTrigger />
          <Link href={"/"}>
            <div className="flex items-center gap-1 p-4">
              <Image
                src="/logo.svg"
                width={32}
                height={32}
                alt="Youtube logo"
              />
              <p className="text-xl font-semibold tracking-tight">NewTube</p>
            </div>
          </Link>
        </div>
        {/* Search bar */}
        <div className="flex flex-1 justify-center max-w-[720px] mx-auto gap-2">
          <SearchInput />
          <div className="p-2 rounded-full">
            <Mic className="stroke-white" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          {isLogin && (
            <>
              <Button className="rounded-full bg-light-gray-100 text-black">
                <Plus className="size-6" />
                Create
              </Button>
              <Button className="rounded-full size-10 p-0" variant="ghost">
                <Bell className="size-6" />
              </Button>
              <Link href={"/"}>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </>
          )}
          {!isLogin && <AuthButton />}
        </div>
      </div>
    </div>
  );
};

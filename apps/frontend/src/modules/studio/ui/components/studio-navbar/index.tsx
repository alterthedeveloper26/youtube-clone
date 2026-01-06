"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const StudioNavbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center shrink-0">
          <SidebarTrigger />
          <Link href={"/studio"}>
            <div className="flex items-center gap-1 p-4">
              <Image
                src="/icons8-youtube-studio.svg"
                width={32}
                height={32}
                alt="Youtube logo"
              />
              <p className="text-xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center justify-center gap-3">
          <AuthButton isStudioAuthButton={true} />
        </div>
      </div>
    </div>
  );
};

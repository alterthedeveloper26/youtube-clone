import { CustomLayoutProps } from "@/types";
import React from "react";

const Layout = ({ children }: CustomLayoutProps) => {
  return (
    <div className="min-h-screen justify-center flex items-center">
      {children}
    </div>
  );
};

export default Layout;

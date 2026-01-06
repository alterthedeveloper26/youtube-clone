import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";
import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;

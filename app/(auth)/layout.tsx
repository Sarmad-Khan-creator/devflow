import { LayoutProps } from "@/.next/types/app/layout";
import React from "react";

const Layout = (props: LayoutProps) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {props.children}
    </main>
  );
};

export default Layout;

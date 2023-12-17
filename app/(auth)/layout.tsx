import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full min-h-screen flex-center">{children}</div>;
};

export default Layout;

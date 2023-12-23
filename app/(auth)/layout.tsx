import React from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ChildrenProps): React.JSX.Element {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
}

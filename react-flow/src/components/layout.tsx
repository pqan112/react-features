import React from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-grow h-screen">{children}</main>
    </SidebarProvider>
  );
}

export default Layout;

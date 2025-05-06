// app/dashboard/layout.tsx

import Sidebar from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-muted">{children}</main>
    </div>
  );
}

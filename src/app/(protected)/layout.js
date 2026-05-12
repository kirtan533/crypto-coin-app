"use client";

import ProtectedRoutes from "@/ui/component/ProtectedRoutes";

export default function ProtectedLayout({ children }) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}

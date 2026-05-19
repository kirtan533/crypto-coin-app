"use client";

import ProtectedRoutes from "@/ui/component/ProtectedRoutes";

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen  bg-gray-800 text-white flex flex-col">
      <ProtectedRoutes>
        <div className="flex-1">{children}</div>
      </ProtectedRoutes>
    </div>
  );
}

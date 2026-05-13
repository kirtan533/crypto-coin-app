"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
}

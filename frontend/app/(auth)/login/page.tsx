import { Suspense } from "react";
import LoginPage from "@/components/auth/Login";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}

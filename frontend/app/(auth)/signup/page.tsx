import { Suspense } from "react";
import SignupContent from "@/components/auth/Signup";

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
};

export default SignupPage;

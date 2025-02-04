import { RegiserForm } from "@/components/auth/register-form";
import MotionWrapper from "@/components/common/MotionWrapper";

export default function SignupPage() {
  return (
    <MotionWrapper className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegiserForm />
      </div>
    </MotionWrapper>
  );
}

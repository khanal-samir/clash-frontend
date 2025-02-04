import ChangePass from "@/components/auth/change-pass";
import MotionWrapper from "@/components/common/MotionWrapper";
import React from "react";

const page = () => {
  return (
    <MotionWrapper className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <ChangePass />
      </div>
    </MotionWrapper>
  );
};

export default page;

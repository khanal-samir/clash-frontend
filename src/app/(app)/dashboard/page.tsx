import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import MotionWrapper from "@/components/common/MotionWrapper";
import { CustomSession, CustomUser } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <MotionWrapper className="container">
      <Navbar />
      <div className="text-end">
        <AddClash user={session?.user as CustomUser} />
      </div>
    </MotionWrapper>
  );
};

export default page;

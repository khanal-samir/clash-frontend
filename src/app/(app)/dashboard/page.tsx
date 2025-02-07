import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchClashes } from "@/app/fetch/fetchClash";
import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import ClashCard from "@/components/clash/ClashCard";
import MotionWrapper from "@/components/common/MotionWrapper";
import { ClashType, CustomSession, CustomUser } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const token = session?.user?.token;
  const clashes: Array<ClashType> | [] = token ? await fetchClashes(token) : [];

  return (
    <MotionWrapper className="container m-auto px-2">
      <Navbar />
      <div className="text-end">
        <AddClash user={session?.user as CustomUser} />
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {clashes.length &&
          clashes.map((clash, index) => (
            <ClashCard
              clash={clash}
              key={index}
              user={session?.user as CustomUser}
            />
          ))}
      </div>
    </MotionWrapper>
  );
};

export default page;

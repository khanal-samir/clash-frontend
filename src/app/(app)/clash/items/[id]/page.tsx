import Navbar from "@/components/base/Navbar";
import { fetchClash } from "@/fetch/fetchClash";
import { ClashType, CustomSession } from "@/types";
import AddclashItems from "@/components/clash/AddclashItems";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function clashItems({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const session: CustomSession | null = await getServerSession(authOptions);
  const clash: ClashType | null = await fetchClash(id);

  return (
    <div className="container m-auto">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
      </div>
      {session && session.user && (
        <AddclashItems clashId={id} token={session.user.token!} />
      )}
    </div>
  );
}

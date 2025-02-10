import Navbar from "@/components/base/Navbar";
import { fetchClash } from "@/fetch/fetchClash";
import { ClashType } from "@/types";
import React from "react";
import Clashing from "@/components/clash/Clashing";

export default async function clashItems({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const clash: ClashType | null = await fetchClash(id);

  return (
    <div className="container m-auto">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
      </div>
      {clash && <Clashing clash={clash} />}
    </div>
  );
}

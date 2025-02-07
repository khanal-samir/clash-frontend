import Navbar from "@/components/base/Navbar";
import { fetchClash } from "@/fetch/fetchClash";
import { ClashType } from "@/types";
import React from "react";

async function ClashItems({ params }: { params: { id: string } }) {
  const clash: ClashType | null = await fetchClash(params.id);
  console.log("The clash is", clash);

  return (
    <div className="container m-auto">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
      </div>

      {/* {clash?.ClashItem && clash.ClashItem.length > 0 ? (
        <ViewClashItems clash={clash} />
      ) : (
        <AddClashItems
          token={session?.user?.token!}
          clashId={params?.id.toString()}
        />
      )} */}
    </div>
  );
}

export default ClashItems;

"use client";
import { ClashType, CustomUser } from "@/types";
import React, { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Env from "@/lib/env";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import DeleteClash from "./DeleteClash";
const EditClash = dynamic(() => import("./EditClash")); // rendering dynamically for faster performance
const ClashCardMenu = ({
  clash,
  user,
}: {
  clash: ClashType;
  user: CustomUser;
}) => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const { toast } = useToast();
  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/clash/${clash.id}`);
    toast({
      title: "Success",
      description: "Link copied successfully.",
    });
  };
  return (
    <div>
      {" "}
      {editOpen && ( // only take token
        <Suspense fallback={<p>Loading</p>}>
          <EditClash
            clash={clash}
            open={editOpen}
            setOpen={setEditOpen}
            user={user}
          />
        </Suspense>
      )}
      {open && (
        <DeleteClash
          id={clash.id}
          open={open}
          setOpen={setOpen}
          token={user.token!}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClashCardMenu;

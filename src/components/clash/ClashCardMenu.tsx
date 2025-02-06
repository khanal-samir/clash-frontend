"use client";
import { ClashType } from "@/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Env from "@/lib/env";
import { useToast } from "@/hooks/use-toast";
const ClashCardMenu = ({ clash }: { clash: ClashType }) => {
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

"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/commonAction";

import { useToast } from "@/hooks/use-toast";

export default function DeleteClash({
  open,
  setOpen,
  token,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  token: string;
  id: number;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    axios
      .delete(`${CLASH_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast({
          title: "Success",
          description: "Toast deleted successfully.",
        });
        setLoading(false);
        clearCache("dashboard");
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed try again",
        });
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the clash from our db permanantly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Processing.." : "Yes Delete it!"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

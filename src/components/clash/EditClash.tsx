"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ClashForm, ClashFormError, ClashType, CustomUser } from "@/types";
import { Textarea } from "../ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/commonAction";

const EditClash = ({
  user,
  clash,
  open,
  setOpen,
}: {
  user: CustomUser;
  clash: ClashType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [clashData, setClashData] = useState<ClashForm>({
    title: clash.title,
    description: clash.description,
  });
  const [date, setDate] = React.useState<Date | null>(null);
  const [image, setImage] = useState<File | null>(null); // preview
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [errors, setErrors] = useState<ClashFormError>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", clashData?.title ?? "");
      formData.append("description", clashData?.description ?? "");
      formData.append("expired_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);

      const { data } = await axios.put(`${CLASH_URL}/${clash.id}`, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      setClashData({});
      setDate(null);
      setImage(null);
      setOpen(false);
      toast({
        title: "Success",
        description: data.message ?? "Clash updated successfull.",
      });
      clearCache("dashboard");
    } catch (error) {
      console.log("The error is ", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.data);
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Clash</DialogTitle>
        </DialogHeader>
        <form className="p-6 md:p-8 space-y-2" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter your clash title"
              value={clashData.title ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, title: e.target.value })
              }
            />
            <span className="text-sm text-red-500">{errors?.title}</span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={clashData.description ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, description: e.target.value })
              }
            />
            <span className="text-sm text-red-500">{errors?.description}</span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
            <span className="text-sm text-red-500">{errors?.image}</span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expired_at">Expires At</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal w-full",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date ?? new Date(Date.now())}
                  onSelect={(date) => setDate(date!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-sm text-red-500">{errors?.expired_at}</span>
          </div>

          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Processing" : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClash;

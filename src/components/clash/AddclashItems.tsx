"use client";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { CLASH_ITEMS_URL } from "@/lib/apiEndPoints";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ClashItemType } from "@/types";
import { Input } from "../ui/input";

export default function AddClashItems({
  token,
  clashId,
}: {
  token: string;
  clashId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<Array<ClashItemType>>([
    {
      image: null,
    },
    {
      image: null,
    },
  ]);
  const [urls, setUrls] = useState(["", ""]);
  const imgRef1 = useRef<HTMLInputElement | null>(null);
  const imgRef2 = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedItems = [...items]; //copy
      updatedItems[index].image = file;
      setItems(updatedItems);
      const imageUrl = URL.createObjectURL(file);
      const updatedUrls = [...urls]; //copy
      updatedUrls[index] = imageUrl;
      setUrls(updatedUrls);
    }
  };
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", clashId);
      items.forEach((item) => {
        if (item.image) formData.append(`images[]`, item.image);
      });
      if (formData.get("images[]")) {
        setLoading(true);
        const { data } = await axios.post(CLASH_ITEMS_URL, formData, {
          headers: {
            Authorization: token,
          },
        });

        if (data?.message) {
          toast({
            title: "Success",
            description: data?.message,
          });
          setTimeout(() => {
            router.replace("/dashboard");
          }, 1000);
        }
        setLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload both images.",
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          if (error.response?.data?.data) {
            error.response?.data?.data.map((err: string) =>
              toast({
                variant: "destructive",
                title: "Error",
                description: err,
              })
            );
          }
        } else if (error.response?.status === 404) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response?.data?.message,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong.please try again!",
        });
      }
    }
  };
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {/* First Block */}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={imgRef1}
            onChange={(e) => handleImageChange(e, 0)}
          />
          <div
            className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]"
            onClick={() => {
              imgRef1?.current?.click();
            }}
          >
            {urls.length && urls[0] !== "" ? (
              <Image
                src={urls[0]}
                alt="preview_1"
                height={500}
                width={500}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>
        {/* VS Block */}
        <div className="flex w-full lg:w-auto justify-center items-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            VS
          </h1>
        </div>
        {/* Second Block */}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <Input
            type="file"
            ref={imgRef2}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 1)}
          />
          <div
            className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]"
            onClick={() => {
              imgRef2?.current?.click();
            }}
          >
            {urls.length && urls[1] !== "" ? (
              <Image
                src={urls[1]}
                alt="preview_1"
                height={500}
                width={500}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing" : "Submit"}
        </Button>
      </div>
    </div>
  );
}

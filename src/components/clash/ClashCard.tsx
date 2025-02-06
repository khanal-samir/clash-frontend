"use client";
import { ClashType } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import ClashCardMenu from "./ClashCardMenu";

const ClashCard = ({ clash }: { clash: ClashType }) => {
  const { toast } = useToast();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>{clash.title}</CardTitle>
          <CardDescription>{clash.description}</CardDescription>
        </div>
        <ClashCardMenu clash={clash} />
      </CardHeader>
      <CardContent className="h-[300px] space-y-2">
        {clash.image && (
          <Image
            className="rounded-md w-full h-[220px] object-contain"
            src={getImageUrl(clash.image)}
            width={500}
            height={500}
            alt={clash.title}
          />
        )}
        <p>
          <strong>Expire At: </strong>
          {new Date(clash.created_at).toLocaleString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button>Add</Button>
      </CardFooter>
    </Card>
  );
};

export default ClashCard;

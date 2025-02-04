"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const CustomAvatar = ({ name = "N/A" }: { name: string }) => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;

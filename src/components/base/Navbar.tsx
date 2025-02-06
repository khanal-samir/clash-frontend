"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "../auth/Logout";
import CustomAvatar from "../common/Avatar";
import React from "react";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className="flex justify-between items-center  h-14  w-full">
      {" "}
      <h1 className="text-3xl md:text-4xl lg:ml-6  font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Clash
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CustomAvatar name="Samir" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen((prev) => !prev)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Logout open={open} setOpen={setOpen} />
    </nav>
  );
};

export default Navbar;

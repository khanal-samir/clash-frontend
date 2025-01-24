import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="w-full h-screen flex flex-col justify-center lg:justify-normal items-center">
      <div>
        <Image src="/clash.svg" width={400} height={400} alt="clash_svg" />
      </div>

      <div className="text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold ">
          Discover the better choice, Together.
        </p>
      </div>

      <Link href="/login">
        <Button className="mt-4 bg-blue-700 hover:bg-blue-500">
          Get started
        </Button>
      </Link>
    </div>
  );
}

export default HeroSection;

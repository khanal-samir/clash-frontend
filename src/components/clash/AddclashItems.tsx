"use client";
import React from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
export default function AddclashItems({
  token,
  clashId,
}: {
  token: string;
  clashId: string;
}) {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {/* First Block */}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            // ref={imgRef1}
            // onChange={(e) => handleImageChange(e, 0)}
          />
          <div
            className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
            // onClick={() => {
            //   imgRef1?.current?.click();
            // }}
          >
            {/* {/* {urls.length > 0 && urls?.[0] !== "" ? (
              <Image
                src={urls?.[0]}
                width={500}
                height={500}
                alt="preview-1"
                className="w-full h-[300px] object-contain"
              /> */}
            ) : (
              <h1 className="flex space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )} */}
          </div>
          {/* <span className="text-red-500">{errors?.[0]}</span> */}
        </div>

        {/* VS Block */}
        <div className="flex w-full lg:w-auto justify-center items-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            VS
          </h1>
        </div>

        {/* Second Block */}
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          {/* <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={imgRef2}
            onChange={(e) => handleImageChange(e, 1)}
          /> */}
          <div
            className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
            // onClick={() => {
            //   imgRef2?.current?.click();
            // }}
          >
            {/* {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[1]}
                width={500}
                height={500}
                alt="preview-1"
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )} */}
          </div>
          {/* <span className="text-red-500">{errors?.[1]}</span> */}
        </div>
      </div>
      <div className="text-center mt-4">
        {/* <Button className="w-52" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing.." : "Submit"}
        </Button> */}
      </div>
    </div>
  );
}

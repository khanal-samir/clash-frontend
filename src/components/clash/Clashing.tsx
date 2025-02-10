"use client";
import { ClashCommentType, ClashItemType, ClashType } from "@/types";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Countup from "react-countup";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
export default function Clashing({ clash }: { clash: ClashType }) {
  const [clashComments, setClashComments] = useState<ClashCommentType[] | []>(
    clash.ClashComments ?? []
  );
  const [clashItems, setClashItems] = useState<ClashItemType[] | []>(
    clash.ClashItem ?? []
  );
  const [comment, setComment] = useState<string | null>(null);
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItems &&
          clashItems &&
          clashItems.map((item, index) => {
            return (
              <Fragment key={item.id}>
                {" "}
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                  <div className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]">
                    <Image
                      src={getImageUrl(item.image)}
                      alt="preview_1"
                      height={500}
                      width={500}
                      className="w-full h-[300px] object-contain"
                    />
                  </div>
                  <Countup
                    start={0}
                    end={item.count}
                    duration={0.5}
                    className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  />
                </div>
                {/* VS Block */}
                {index % 2 === 0 && (
                  <div className="flex w-full lg:w-auto justify-center items-center">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                      VS
                    </h1>
                  </div>
                )}
              </Fragment>
            );
          })}
      </div>
      <form className="mt-4 w-full ">
        <Textarea
          placeholder="Type your suggestions"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="w-full mt-2"> Submit</Button>
      </form>

      {/* Display comments */}
      <div className="mt-4">
        {clashComments &&
          clashComments.length > 0 &&
          clashComments.map((item, index) => (
            <div
              className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4"
              key={index}
            >
              <p className="font-bold">{item.comment}</p>
              <p>{new Date(item.created_at).toDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

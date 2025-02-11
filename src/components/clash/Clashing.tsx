"use client";
import { ClashCommentType, ClashItemType, ClashType } from "@/types";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Countup from "react-countup";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ThumbsUpIcon } from "lucide-react";
import socket from "@/lib/socket";

export default function Clashing({ clash }: { clash: ClashType }) {
  const [clashComments, setClashComments] = useState<ClashCommentType[]>(
    clash.ClashComments ?? []
  );
  const [clashItems, setClashItems] = useState<ClashItemType[]>(
    clash.ClashItem ?? []
  );
  const [comment, setComment] = useState<string>("");
  const [hideVote, setHideVote] = useState(false);

  const handleVote = (id: string) => {
    if (clashItems.length) {
      setHideVote(true);
      updateCounter(id);
      socket.emit(`clashing-${clash.id}`, {
        clashId: clash.id,
        clashItemId: id,
      });
    }
  };

  const updateCounter = (id: string) => {
    setClashItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const updateComment = (payload: ClashCommentType) => {
    setClashComments((prevComments) => [payload, ...prevComments]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (comment.trim().length > 2) {
      const payload = {
        id: clash.id,
        comment: comment.trim(),
        created_at: new Date().toISOString(),
      };

      socket.emit(`clashing_comment-${clash.id}`, payload);
      updateComment(payload);
      setComment("");
    } else {
      console.log("Comment must be at least 3 characters");
    }
  };

  useEffect(() => {
    const handleClashingUpdate = (payload: { clashItemId: string }) => {
      updateCounter(payload.clashItemId);
    };

    const handleCommentUpdate = (payload: ClashCommentType) => {
      setClashComments((prevComments) => {
        // Check if comment already exists to prevent duplicates
        const commentExists = prevComments.some(
          (comment) => comment.created_at === payload.created_at
        );
        if (!commentExists) {
          return [payload, ...prevComments];
        }
        return prevComments;
      });
    };

    socket.on(`clashing-${clash.id}`, handleClashingUpdate);
    socket.on(`clashing_comment-${clash.id}`, handleCommentUpdate);

    return () => {
      socket.off(`clashing-${clash.id}`, handleClashingUpdate);
      socket.off(`clashing_comment-${clash.id}`, handleCommentUpdate);
    };
  }, [clash.id]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItems.map((item, index) => (
          <Fragment key={item.id}>
            <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
              <div className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]">
                <Image
                  src={getImageUrl(item.image)}
                  alt={`clash_image_${index + 1}`}
                  height={500}
                  width={500}
                  className="w-full h-[300px] object-contain"
                />
              </div>
              {hideVote ? (
                <Countup
                  start={0}
                  end={item.count}
                  duration={0.5}
                  className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                />
              ) : (
                <Button className="mt-2" onClick={() => handleVote(item.id)}>
                  <span className="mr-2 text-lg">
                    vote <ThumbsUpIcon className="ml-2" />
                  </span>
                </Button>
              )}
            </div>
            {index % 2 === 0 && (
              <div className="flex w-full lg:w-auto justify-center items-center">
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                  VS
                </h1>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <form className="mt-4 w-full" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Type your suggestions"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="w-full mt-2">Submit</Button>
      </form>

      <div className="mt-4">
        {clashComments.map((item, index) => (
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

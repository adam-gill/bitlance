"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ImageLoader from "@/components/ui/ImageLoader";

export default function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-8">
        <h1 className="text-6xl items-center justify-center mb-4">BitLance</h1>
        <h1 className="flex items-center justify-center mb-4">
          Hey team! I&#39;ve initialized this next/react app for use to use as our
          front end throughout this project
        </h1>
        <ImageLoader
          src={"https://miro.medium.com/v2/resize:fit:1400/1*Ju5Tcw4nFGuE_9gEmxCdQA.png"}
        />
        <div className="flex items-center justify-center">
          <Button
            className="w-[50px] h-[50px]"
            onClick={() => setCounter(counter - 1)}
          >
            -
          </Button>
          <div className="p-8">{counter}</div>
          <Button
            className="w-[50px] h-[50px]"
            onClick={() => setCounter(counter + 1)}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Button } from "../ui/button";
import ImageLoader from "../ui/ImageLoader";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LandingPage = () => {
  return (
    <>
      <div className="w-full h-screen  bg-primaryBitlanceDark  text-primaryBitlanceGray">
        <div className="flex flex-col gap-8 items-center w-full justify-center  h-full">
          <h1 className="text-6xl font-bold text-white ">
            Find Your Dream Job Today!
          </h1>
          <span>
            Connecting Talent with opportunity: Your Gateway to Career Success
          </span>

          <Button disabled={true} className="w-1/2 h-12 text-4xl">
            BITLANCE
          </Button>
          <div className="flex justify-around items-center gap-8">
            <Card className="bg-transparent border-none">
              <CardContent className="flex gap-4">
                <div className="bg-primaryBitlanceLightGreen rounded-full h-10 w-10 flex items-center justify-center">
                  <Image
                    src="/svg/jobs.svg"
                    alt=""
                    width={20}
                    height={10}
                    className="bg-transparent"
                  />
                </div>
                <div>
                  <CardTitle className="text-white">25,850</CardTitle>
                  <CardDescription>Jobs</CardDescription>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-none">
              <CardContent className="flex gap-4">
                <div className="bg-primaryBitlanceLightGreen rounded-full h-10 w-10 flex items-center justify-center">
                  <Image
                    src="/svg/candidate.svg"
                    alt=""
                    width={20}
                    height={10}
                    className="bg-transparent"
                  />
                </div>
                <div>
                  <CardTitle className="text-white">10,250</CardTitle>
                  <CardDescription>Candidate</CardDescription>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-none">
              <CardContent className="flex gap-4">
                <div className="bg-primaryBitlanceLightGreen rounded-full h-10 w-10 flex items-center justify-center">
                  <Image
                    src="/svg/company.svg"
                    alt=""
                    width={20}
                    height={10}
                    className="bg-transparent"
                  />
                </div>
                <div>
                  <CardTitle className="text-white">18,400</CardTitle>
                  <CardDescription>Companies</CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

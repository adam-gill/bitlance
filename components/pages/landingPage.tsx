import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LandingPage = () => {
  return (
    <div className="w-full h-screen bg-primaryBitlanceDark text-primaryBitlanceGray">
      <div className="flex flex-col gap-8 items-center w-full justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Find Your Dream Job Today!</h1>
        <span>Connecting Talent with opportunity: Your Gateway to Career Success</span>
        <Button
          disabled={false}
          className="w-1/2 h-16 text-4xl bg-primaryBitlanceLightGreen text-black hover:bg-primaryBitlanceGreen hover:text-white transition duration-300 shadow-lg rounded-full"
        >
          Explore Jobs
        </Button>
        <div className="flex justify-around items-center gap-8 w-full">
          <Card className="bg-transparent border-none">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primaryBitlanceLightGreen rounded-full h-16 w-16 flex items-center justify-center">
                <Image src="/svg/jobs.svg" alt="Freelancers" width={40} height={40} className="bg-transparent" />
              </div>
              <CardTitle className="text-white text-center">Freelancers</CardTitle>
              <CardDescription className="text-center">Here to provide you the services you need.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-transparent border-none">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primaryBitlanceLightGreen rounded-full h-16 w-16 flex items-center justify-center">
                <Image src="/svg/candidate.svg" alt="Clients" width={40} height={40} className="bg-transparent" />
              </div>
              <CardTitle className="text-white text-center">Clients</CardTitle>
              <CardDescription className="text-center">Here to pay you for your services.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-transparent border-none">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primaryBitlanceLightGreen rounded-full h-16 w-16 flex items-center justify-center">
                <Image src="/svg/company.svg" alt="Companies" width={40} height={40} className="bg-transparent" />
              </div>
              <CardTitle className="text-white text-center">Companies</CardTitle>
              <CardDescription className="text-center">Who want to recruit you for your services.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

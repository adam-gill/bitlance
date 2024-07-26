import React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleExploreJobsClick = () => {
    router.replace("/job");
  };

  return (
    <div className="w-full h-screen bg-primaryBitlanceDark text-primaryBitlanceGray">
      <div className="flex flex-col gap-8 items-center w-full justify-center h-full px-4 md:px-0">
        <h1 className="text-3xl mt-12 pt-12 md:text-6xl font-bold text-white text-center">Find Your Dream Job Today!</h1>
        <span className="text-center text-sm md:text-base">Connecting Talent with Opportunity: Your Gateway to Career Success</span>
        <Button
          onClick={handleExploreJobsClick}
          disabled={false}
          className="w-3/4 md:w-1/2 h-12 md:h-16 text-xl md:text-4xl bg-primaryBitlanceLightGreen text-black hover:bg-primaryBitlanceGreen hover:text-white transition duration-300 shadow-lg rounded-full"
        >
          Explore Jobs
        </Button>
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-8 w-full mt-8">
          <Card className="bg-transparent border-none">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primaryBitlanceLightGreen rounded-full h-12 md:h-16 w-12 md:w-16 flex items-center justify-center">
                <Image src="/svg/jobs.svg" alt="Freelancers" width={30} height={30} className="bg-transparent" />
              </div>
              <CardTitle className="text-white text-center text-sm md:text-base">Freelancers</CardTitle>
              <CardDescription className="text-center text-xs md:text-sm">Here to provide you the services you need.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-transparent border-none">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primaryBitlanceLightGreen rounded-full h-12 md:h-16 w-12 md:w-16 flex items-center justify-center">
                <Image src="/svg/candidate.svg" alt="Clients" width={30} height={30} className="bg-transparent" />
              </div>
              <CardTitle className="text-white text-center text-sm md:text-base">Clients</CardTitle>
              <CardDescription className="text-center text-xs md:text-sm">Here to pay you for your services.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-transparent border-none">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-primaryBitlanceLightGreen rounded-full h-12 md:h-16 w-12 md:w-16 flex items-center justify-center">
                <Image src="/svg/company.svg" alt="Companies" width={30} height={30} className="bg-transparent" />
              </div>
              <CardTitle className="text-white text-center text-sm md:text-base">Companies</CardTitle>
              <CardDescription className="text-center text-xs md:text-sm">Who want to recruit you for your services.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const servicesData = [
  {
    id: 1,
    imgSrc: "/svg/market.svg",
    imgAlt: "market",
    header: "Freelancer Marketplace",
    descriptions: ["Project Listing", "Skill Matching"],
  },
  {
    id: 2,
    imgSrc: "/svg/crypto.svg",
    imgAlt: "crypto",
    header: "Crypto Payments",
    descriptions: ["Support stable coins"],
  },
  {
    id: 3,
    imgSrc: "/svg/key.svg",
    imgAlt: "key",
    header: "Secure Payments",
    descriptions: ["Escrow Services", "Smart Contract"],
  },
  {
    id: 4,
    imgSrc: "/svg/solution.svg",
    imgAlt: "solution",
    header: "Dispute Resolution",
    descriptions: ["Arbitration services"],
  },
  {
    id: 5,
    imgSrc: "/svg/setting.svg",
    imgAlt: "setting",
    header: "Portfolio Management",
    descriptions: ["Freelancer Profiles", "Client Reviews", "and Ratings"],
  },
];

const ServicesPage = () => {
  return (
    <>
      <div className="w-full h-screen bg-white text-black">
        <div className="flex flex-col gap-4 items-center w-full h-full">
          <h1 className="text-4xl font-bold text-center pt-10">SERVICES</h1>
          <div className="flex justify-center items-center h-full">
          <Carousel className="w-full max-w-6xl">
            <CarouselContent className="h-5/6 w-full">
              {servicesData.map((service) => (
                <CarouselItem key={service.id} className="md:basis-1/3 w-full h-full flex justify-center items-center">
                  <Card className="w-80 h-96  bg-primaryBitlanceGray">
                    <CardHeader className="flex justify-center items-center">
                      <div className="rounded-full h-20 w-32 flex items-center justify-center">
                        <Image
                          src={service.imgSrc}
                          alt={service.imgAlt}
                          width={58}
                          height={40}
                          className="bg-transparent"
                        />
                      </div>
                    </CardHeader>
                    <CardDescription className="flex justify-center items-center">
                      <span className="text-black font-bold">{service.header}</span>
                    </CardDescription>
                    <CardContent className="flex justify-center items-center h-1/2">
                      <CardDescription className="flex flex-col gap-8">
                        {service.descriptions.map((desc, index) => (
                          <span key={index} className="text-black">{desc}</span>
                        ))}
                      </CardDescription>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesPage;

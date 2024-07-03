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
    imgAlt: "Freelancer Marketplace",
    header: "Freelancer Marketplace",
    descriptions: ["Post and browse projects", "Find the perfect match based on skills"],
  },
  {
    id: 2,
    imgSrc: "/svg/crypto.svg",
    imgAlt: "Crypto Payments",
    header: "Crypto Payments",
    descriptions: ["Seamless integration with stable coins", "Fast and secure transactions"],
  },
  {
    id: 3,
    imgSrc: "/svg/key.svg",
    imgAlt: "Secure Payments",
    header: "Secure Payments",
    descriptions: ["Reliable escrow services", "Automated through smart contracts"],
  },
  {
    id: 4,
    imgSrc: "/svg/solution.svg",
    imgAlt: "Dispute Resolution",
    header: "Dispute Resolution",
    descriptions: ["Professional arbitration services", "Ensuring fair outcomes for all parties"],
  },
  {
    id: 5,
    imgSrc: "/svg/setting.svg",
    imgAlt: "Portfolio Management",
    header: "Portfolio Management",
    descriptions: ["Detailed freelancer profiles", "Client reviews and ratings", "Showcase your work"],
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
                    <Card className="w-80 h-96 bg-primaryBitlanceGray">
                      <CardHeader className="flex justify-center items-center">
                        <div className="rounded-full h-20 w-32 flex items-center justify-center">
                          <Image
                            src={service.imgSrc}
                            alt={service.imgAlt}
                            className="bg-transparent"
                            width={58}
                            height={40}
                          />
                        </div>
                      </CardHeader>
                      <CardDescription className="flex justify-center items-center text-center">
                        <span className="text-black font-bold">{service.header}</span>
                      </CardDescription>
                      <CardContent className="flex justify-center items-center h-1/2">
                        <CardDescription className="flex flex-col gap-8 text-center">
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

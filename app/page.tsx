"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ImageLoader from "@/components/ui/ImageLoader";
import LandingPage from "@/components/pages/landingPage";
import ServicesPage from "@/components/pages/services";

export default function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <main className="min-h-screen w-full overflow-auto pt-16">
        <LandingPage/>
        <ServicesPage/>
      </main>
    </>
  );
}

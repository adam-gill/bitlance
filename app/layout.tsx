import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import AuthProvider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import { ContextProvider } from "@/context/contextConnect";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BitLance",
  description: "Next Generation of Freelancing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    

    <html lang="en">
      <body className={inter.className}>
      <AuthProvider session={session}>
        <ContextProvider>
        <div className="fixed w-full "><Navbar/></div>

        
        {children}
        </ContextProvider>
        </AuthProvider>
        </body>
        </html>
       
        
        
    
  );
}

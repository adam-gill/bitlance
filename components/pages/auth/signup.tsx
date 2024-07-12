"use client";
// Import necessary components and types
import React from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { UserSignUp } from "@/config/apiconfig";
import { NotificationAuth } from "@/components/errorNotification";
import { TailSpin } from "react-loading-icons";
import { Role } from "@prisma/client"; // Import Role type from Prisma

// Define types
type ClientData = {
  user_id: string;
  company_name: string;
  company_description: string | null;
  websiteLink: string; // Include websiteLink in ClientData
};

type FreelancerData = {
  user_id: string;
  bio: string;
  skills: string;
  portfolio_link: string;
  social_link: string;
};

type UserData = {
  username: string;
  password: string;
  email: string;
  role: Role;
  freelancer?: FreelancerData;
  client?: ClientData;
};

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null | undefined>("");
  const [role, setRole] = React.useState<Role>("FREELANCER"); // Use Role type from Prisma
  const [clientData, setClientData] = React.useState<ClientData>({
    user_id: "",
    company_name: "",
    company_description: "",
    websiteLink: "", // Initialize websiteLink
  });
  const [freelancerData, setFreelancerData] = React.useState<FreelancerData>({
    user_id: "",
    bio: "",
    skills: "",
    portfolio_link: "",
    social_link: "",
  });

  const handleSignUp = async () => {
    const data: UserData = {
      email: email,
      password: password,
      username: username,
      role: role.toUpperCase() as Role, // Ensure role is of type Role
      freelancer: role === "FREELANCER" || role === "BOTH" ? freelancerData : undefined,
      client: role === "CLIENT" || role === "BOTH" ? clientData : undefined,
    };

    // Validate required fields
    const requiredFields = [email, password, username, confirmPassword];
    let allInputsConfigured = requiredFields.every(field => !!field);

    if (role === 'FREELANCER' || role === 'BOTH') {
      const freelancerFields = [freelancerData.bio, freelancerData.skills, freelancerData.portfolio_link, freelancerData.social_link];
      allInputsConfigured = allInputsConfigured && freelancerFields.every(field => !!field);
    }

    if (role === 'CLIENT' || role === 'BOTH') {
      const clientFields = [clientData.company_name, clientData.company_description, clientData.websiteLink];
      allInputsConfigured = allInputsConfigured && clientFields.every(field => !!field);
    }

    if (!allInputsConfigured) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await UserSignUp(data);
      setLoading(false);
      if (res.status === 201) {
        // Registration was successful
        console.log('User registered successfully');
        router.replace('/login'); // Redirect to login page
      } else {
        setError(res.message || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error('Failed to register:', error);
      setError("Failed to register. Please try again.");
      setLoading(false);
    }
  };

  const keyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSignUp();
      }
    },
    [email, password, confirmPassword, username]
  );
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  };

  const handleClientDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prevClientData) => ({
      ...prevClientData,
      [name]: value,
    }));
  };

  const handleFreelancerDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFreelancerData((prevFreelancerData) => ({
      ...prevFreelancerData,
      [name]: value,
    }));
  };

  // Check if all inputs are configured
  const allInputsConfigured = 
    email && password && username && confirmPassword &&
    (role !== 'FREELANCER' || (freelancerData.bio && freelancerData.skills && freelancerData.portfolio_link && freelancerData.social_link)) &&
    (role !== 'CLIENT' || (clientData.company_name && clientData.company_description && clientData.websiteLink));

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        <div className="bg-primaryBitlanceDark h-auto md:h-4/4 w-11/12 md:w-3/4 rounded-3xl grid grid-cols-1 md:grid-cols-2 text-white shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center h-full p-8">
            <Card className="w-full h-full bg-transparent border-none">
              <CardHeader className="flex justify-center items-center">
                <span className="text-3xl font-bold text-white">CREATE ACCOUNT</span>
              </CardHeader>
              <CardDescription className="flex justify-center items-center text-center py-4 text-lg">
                We are glad to have you as part of our community!
              </CardDescription>
              <CardContent className="flex flex-col gap-4 justify-center items-center">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md"
                  placeholder="Email"
                  required
                />
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 rounded-md"
                  required
                  placeholder="Username"
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="w-full p-3 rounded-md"
                  placeholder="Password"
                />
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  className="w-full p-3 rounded-md"
                  placeholder="Confirm Password"
                />
                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleSignUp}
                    className={`flex justify-center w-full py-3 bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300 ${loading || !allInputsConfigured ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading || !allInputsConfigured}
                  >
                    {loading ? <TailSpin stroke="#181818" width={32} strokeWidth={3} speed={2} /> : "SIGN UP"}
                  </Button>
                </div>
                <NotificationAuth message={error} />
                <Separator className="w-full my-2" />
                <Button className="w-full h-12 border-primaryBitlanceLightGreen bg-transparent text-primaryBitlanceLightGreen hover:bg-primaryBitlanceLightGreen hover:text-black transition duration-300 flex items-center justify-center gap-2" variant="outline">
                  <FcGoogle className="w-6 h-6" />
                  <span>Login with Google</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col justify-center items-center h-full p-8">
            <Card className="w-full h-full bg-transparent border-none">
              <CardHeader className="flex justify-center items-center">
                <span className="text-3xl font-bold text-white">ROLE DETAILS</span>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 justify-center items-center">
                <select onChange={handleRoleChange} className="w-full p-3 rounded-md">
                  <option value="FREELANCER">Freelancer</option>
                  <option value="CLIENT">Client</option>
                  <option value="BOTH">Both</option>
                </select>
                {role === "CLIENT" || role === "BOTH" ? (
                  <>
                    <Input
                      onChange={handleClientDataChange}
                      name="company_name"
                      className="w-full p-3 rounded-md"
                      placeholder="Company Name"
                      required
                    />
                    <Input
                      onChange={handleClientDataChange}
                      name="company_description"
                      className="w-full p-3 rounded-md"
                      placeholder="Company Description"
                      required
                    />
                    <Input
                      onChange={handleClientDataChange}
                      name="websiteLink"
                      className="w-full p-3 rounded-md"
                      placeholder="Website Link"
                      required
                    />
                  </>
                ) : null}
                {role === "FREELANCER" || role === "BOTH" ? (
                  <>
                    <Input
                      onChange={handleFreelancerDataChange}
                      name="bio"
                      className="w-full p-3 rounded-md"
                      placeholder="Bio"
                      required
                    />
                    <Input
                      onChange={handleFreelancerDataChange}
                      name="skills"
                      className="w-full p-3 rounded-md"
                      placeholder="Skills"
                      required
                    />
                    <Input
                      onChange={handleFreelancerDataChange}
                      name="portfolio_link"
                      className="w-full p-3 rounded-md"
                      placeholder="Portfolio Link"
                      required
                    />
                    <Input
                      onChange={handleFreelancerDataChange}
                      name="social_link"
                      className="w-full p-3 rounded-md"
                      placeholder="Social Link"
                      required
                    />
                  </>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

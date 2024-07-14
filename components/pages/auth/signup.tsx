"use client";
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
import { Role } from "@prisma/client";

type ClientData = {
  user_id: string;
  company_name: string;
  company_description: string | null;
  websiteLink: string;
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
  const [role, setRole] = React.useState<Role>("FREELANCER");
  const [clientData, setClientData] = React.useState<ClientData>({
    user_id: "",
    company_name: "",
    company_description: "",
    websiteLink: "",
  });
  const [freelancerData, setFreelancerData] = React.useState<FreelancerData>({
    user_id: "",
    bio: "",
    skills: "",
    portfolio_link: "",
    social_link: "",
  });
  const [step, setStep] = React.useState(1);

  const handleSignUp = async () => {
    const data: UserData = {
      email: email,
      password: password,
      username: username,
      role: role.toUpperCase() as Role,
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
      console.log(res);
      setLoading(false);
      if (res.success === true) {
        router.replace('/login');
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        <div className="bg-primaryBitlanceDark h-auto md:h-4/4 w-full md:w-3/4 mx-auto rounded-3xl text-white shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center h-full p-8">
            <Card className="w-full h-full bg-transparent border-none">
              <CardHeader className="flex justify-center items-center">
                <span className="text-3xl font-bold text-white">CREATE ACCOUNT</span>
              </CardHeader>
              <CardDescription className="flex justify-center items-center text-center py-4 text-lg">
                We are glad to have you as part of our community!
              </CardDescription>
              <CardContent className="flex flex-col gap-4 justify-center items-center">
                {step === 1 && (
                  <>
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
                  </>
                )}
                {step === 2 && (
                  <>
                    <select onChange={handleRoleChange} className="w-full p-3 rounded-md">
                      <option value="FREELANCER">Freelancer</option>
                      <option value="CLIENT">Client</option>
                      <option value="BOTH">Both</option>
                    </select>
                  </>
                )}
                {step === 3 && (
                  <>
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
                  </>
                )}
                {error && <NotificationAuth message={error} />}
                <Separator className="my-4" />
                <div className="flex justify-between w-full mb-4">
                  {step > 1 && (
                    <Button
                      onClick={prevStep}
                      className="w-[45%] p-3 rounded-md bg-primaryBitlanceLightGreen text-black"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 3 && (
                    <Button
                      onClick={nextStep}
                      className="w-[45%] p-3 rounded-md bg-primaryBitlanceLightGreen text-black"
                    >
                      Next
                    </Button>
                  )}
                </div>
                {loading ? (
                  <TailSpin stroke="white" />
                ) : (
                  <Button onClick={handleSignUp} className="w-full p-3 rounded-md bg-primaryBitlanceLightGreen text-black">
                    Sign Up
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { JobRequestDetails } from "@/types/data-types";
  
  
  interface AlertProps {
    jobRequest: JobRequestDetails;
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  
  export function JobAlertdetails({ jobRequest, open, setOpen }: AlertProps) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Job Title: {jobRequest.job.title}</AlertDialogTitle>
            <AlertDialogDescription> job Description:  {jobRequest.job.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className=" w-full">
            <Card className="bg-gray-800 text-white shadow-lg rounded-lg p-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Freelancer Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Name:</span> {jobRequest.freelancer.name}
                     
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Skills:</span> {jobRequest.freelancer.skills}
                     
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Bio:</span> {jobRequest.freelancer.bio}
                     
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Portfolio:</span> {jobRequest.freelancer.portfolio_link}
                     
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Email:</span> {jobRequest.freelancer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Username:</span> {jobRequest.freelancer.username}
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="text-sm">
                  <span className="font-semibold">Freelancer ID:</span> {jobRequest.freelancer.user_id}
                </div>
              </CardFooter>
            </Card>

            {/* second */}
            <Card className="bg-gray-800 text-white shadow-lg rounded-lg p-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Client Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Company Name:</span> {jobRequest.client.company_name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Description:</span> {jobRequest.client.company_description}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Link:</span> {jobRequest.client.websiteLink}
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="text-sm">
                  <span className="font-semibold">Client ID:</span> {jobRequest.client.user_id}
                </div>
              </CardFooter>
            </Card>

            
            
            
          </div>
          <AlertDialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
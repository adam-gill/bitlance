import React, { useState, useEffect } from 'react';
import { createJob } from "@/config/apiconfig";
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { Category } from '@prisma/client';

interface JobData {
  title:string;
  description: string;
  category: Category;
  user_id: string; // Correct property name according to API
  price: number;
  client_address: string
}

const JobModal: React.FC<{ isOpen: boolean; onClose: () => void; clientId: string }> = ({ isOpen, onClose, clientId }) => {
  const {address} = useAccount();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [animateOut, setAnimateOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, settitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobDetails: JobData = {
      title,
      description,
      category: category as Category,
      user_id: clientId, // Use clientId as client_id
      price: parseFloat(price),
      client_address:address as string  //new added value

    };

    try {
      if(!address){
        setError("Please connect your wallet");
        return;
      }
      await createJob(jobDetails);
      handleClose();
    } catch (err) {
      setError('Failed to create job. Please try again.');
    }
  };

  const handleClose = () => {
    setAnimateOut(true);
  };

  useEffect(() => {
    if (isOpen) {
      setAnimateOut(false);
      setError(null); // Reset error message when modal opens
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (animateOut) {
      timer = setTimeout(onClose, 500); // Match the duration of the slide-out animation
    }
    return () => clearTimeout(timer);
  }, [animateOut, onClose]);

  if (!isOpen && !animateOut) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${animateOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className={`bg-primaryBitlanceDark rounded-3xl p-6 z-10 w-full max-w-md mx-auto text-white ${animateOut ? 'animate-slide-out' : 'animate-slide-in'}`}>
        <div className="flex flex-col justify-center items-center h-full p-8">
          <Card className="w-full h-full bg-transparent border-none">
            <CardHeader className="flex justify-center items-center">
              <span className="text-3xl font-bold text-white">Create Job</span>
            </CardHeader>
            <CardDescription className="flex justify-center items-center text-center pb-4 text-lg">
              Fill out the form below to create a new job.
            </CardDescription>
            <CardContent className="flex flex-col gap-4 justify-center items-center w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <Input
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-md bg-white text-gray-800"
                    placeholder="Description"
                    value={description}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 rounded-md bg-white text-gray-800"
                    placeholder="Category"
                    value={category}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 rounded-md bg-white text-gray-800"
                    placeholder="Price"
                    value={price}
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 mb-4 text-center">
                    {error}
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-primaryBitlanceLightGreen text-black font-semibold rounded-md hover:bg-primaryBitlanceGreen transition duration-300"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobModal;

import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";

export const Error = () => {
  const router = useRouter();
  const navigateBack = () => router.history.back();
  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold py-20">Oops, an error occured!</h1>
        <Button variant={"ghost"} onClick={navigateBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

import { Link } from "@tanstack/react-router";

export const NotFound = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold py-20">
          The page you are looking for cannot be found
        </h1>
        <Link to={"/"}>Go Home</Link>
      </div>
    </div>
  );
};

import { IconUserFilled } from "@tabler/icons-react";

export const Header = () => {
  return (
    <header className="w-full py-10 bg-slate-900 flex justify-end text-gray-200">
      <h2 className="px-8 flex gap-2 items-center">
        <IconUserFilled />
        Signed in as: <span>Sam</span>
      </h2>
    </header>
  );
};

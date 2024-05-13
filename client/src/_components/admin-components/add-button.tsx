import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

type AddButtonProps = {
  children: React.ReactNode;
  type: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const AddButton: React.FC<AddButtonProps> = ({
  children,
  type,
  open,
  setOpen,
}) => {
  return (
    <>
      <div
        className="fixed bottom-10 right-10 text-black cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="fixed bottom-10 right-10 text-white dark:text-black cursor-pointer flex gap-2"
        >
          <PlusCircleIcon className="h-6 w-6" />
          Add {type}
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {type}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

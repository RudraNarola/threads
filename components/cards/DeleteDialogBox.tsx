import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export function DeleteDialogBox() {
  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this thread?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { Delete, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteThread } from "@/lib/actions/thread.actions";

const DropDownMenu = ({ id }: { id: string }) => {
  function handleDeletThread() {
    deleteThread(id, "/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Image
            src={"/assets/morev.svg"}
            alt="more"
            height={16}
            width={16}
            className="text-light-1"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-700 text-light-1 w-2">
        <DropdownMenuGroup>
          <DropdownMenuItem className="h-6">
            <Edit className="mr-2 h-4 w-4" />
            <Link href={`/thread/edit/${id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="h-6" onClick={handleDeletThread}>
            <Delete className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;

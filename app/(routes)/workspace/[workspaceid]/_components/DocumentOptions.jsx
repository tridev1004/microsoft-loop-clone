import { Link2Icon, MoreVerticalIcon, PenBox, Trash2 } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DocumentOptions = ({doc,deleteDocument}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <MoreVerticalIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
      
          <DropdownMenuItem className="flex gap-2"> <Link2Icon className="w-4 h-4"/> Share Link</DropdownMenuItem>
          <DropdownMenuItem  className="flex gap-2"> <PenBox className="w-4 h-4"/>Rename</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>deleteDocument(doc?.id)}  className="flex gap-2 text-red-500"> <Trash2 className="w-4 h-4"/>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocumentOptions;

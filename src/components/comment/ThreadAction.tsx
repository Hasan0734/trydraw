import { CheckCircle, Ellipsis, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCommentStore } from "./comments.store";

interface PropsType {
  threadId: string;
  handleResolve: (id: string) => void;
  resolved: boolean;
}

const ThreadAction = ({ threadId, handleResolve, resolved }: PropsType) => {
  const deleteThread = useCommentStore((s) => s.deleteThread);

  const handleDelete = () => {
    deleteThread(threadId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon-xs"} className="">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" sideOffset={-28} alignOffset={300}>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleResolve(threadId)}
            className=""
          >
            <CheckCircle /> {resolved ? "Re-Open Thread" : "Resolve Thread"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className=""
            variant="destructive"
          >
            <Trash /> Delete Thread
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThreadAction;

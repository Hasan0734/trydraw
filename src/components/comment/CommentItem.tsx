import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit2, EditIcon, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";

const CommentItem = () => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1">
          <Avatar size="sm">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>Jahid Hasan</div>
        </div>
        <div className="text-xs text-muted-foreground">1 day ago</div>
        <div>
          <Button variant={"ghost"} size="icon-xs">
            <Edit2 />
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground pl-7">Lorem ipsum dolor sit amet.</p>
    </div>
  );
};

export default CommentItem;

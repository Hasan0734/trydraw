import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Send } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group";

const CommentForm = () => {
  return (
    <div className="flex gap-1 items-center">
      <InputGroup className="w-full rounded-xl has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupInput placeholder="Comments, replay @mention " />
        <InputGroupAddon align={'inline-start'} className="pl-0.5">
          <Avatar size="sm">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </InputGroupAddon>
        <InputGroupAddon align={"inline-end"}>
          <InputGroupButton>
            <Send />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default CommentForm;

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit2, Send, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import { useCommentStore, type CommentMessage } from "./comments.store";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import TooltipWrapper from "../TooltipWrapper";

interface PropsType {
  message: CommentMessage;
  editing: string | null;
  setEditing: Dispatch<SetStateAction<string | null>>;
  threadId: string;
}

const CommentItem = ({ message, editing, setEditing, threadId }: PropsType) => {
  const [value, setValue] = useState<string>(message.text);
  const updateComment = useCommentStore((s) => s.editMessage);
  const deleteMessage = useCommentStore((s) => s.deleteMessage);


  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!value) return;
    updateComment(threadId, message.id, value);
    setValue("");
    setEditing(null);
    return;
  };

  const handleDeleteMessage = () => {
    deleteMessage(threadId, message.id);
  };
  return (
    <div className="space-y-2 mb-2">
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
          <div>{message.author}</div>
        </div>
        <div className="text-xs text-muted-foreground">1 day ago</div>
        <div className="flex gap-0.5">
          {!editing && (
            <Button
            className="text-muted-foreground"
              onClick={() => setEditing(message.id)}
              variant={"ghost"}
              size="icon-xs"
            >
              <Edit2 />
            </Button>
          )}
          <Button
          className="text-muted-foreground"
            onClick={handleDeleteMessage}
            size="icon-xs"
            variant={'ghost'}
          >
            <Trash />
          </Button>
        </div>
      </div>

      {editing !== message.id && (
        <p className="text-muted-foreground pl-7">{message.text}</p>
      )}

      {editing === message.id && (
        <form className="flex gap-1 items-center pr-4" onSubmit={onSubmit}>
          <InputGroup className="w-full rounded-xl has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Comments, replay @mention "
            />
            <InputGroupAddon align={"inline-end"} className="gap-px">
              <TooltipWrapper content="Submit">
                <InputGroupButton
                  type="submit"
                  variant={"ghost"}
                  size={"icon-xs"}
                >
                  <Send />
                </InputGroupButton>
              </TooltipWrapper>
              <TooltipWrapper content="Close">
                <InputGroupButton
                  onClick={() => setEditing("")}
                  type="button"
                  variant={"ghost"}
                  size={"icon-xs"}
                >
                  <X />
                </InputGroupButton>
              </TooltipWrapper>
            </InputGroupAddon>
          </InputGroup>
        </form>
      )}
    </div>
  );
};

export default CommentItem;

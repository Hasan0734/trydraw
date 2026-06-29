import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Send } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group";
import { useCommentStore, type CommentThread } from "./comments.store";
import { useState, type SubmitEventHandler, type SyntheticEvent } from "react";

const CommentForm = ({ comment }: { comment: CommentThread }) => {
  const [value, setValue] = useState("");
  const updateComment = useCommentStore((s) => s.editMessage);
  const addReply = useCommentStore((s) => s.addReply);

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    if (!comment.messages[0]?.text) {
      updateComment(comment.id, comment.messages[0]?.id, value);
      setValue("");

      return;
    }
    addReply(comment.id, value, "Jahid Hasan");
    setValue("");
  };

  return (
    <form className="flex gap-1 items-center" onSubmit={onSubmit}>
      <InputGroup className="w-full rounded-xl has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Comments, replay @mention "
        />
        <InputGroupAddon align={"inline-start"} className="pl-0.5">
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
          <InputGroupButton type="submit">
            <Send />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default CommentForm;

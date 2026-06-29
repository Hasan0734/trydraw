import { useEditor } from "tldraw";
import { useCommentStore, type CommentThread } from "./comments.store";
import { useEffect, useRef, useState } from "react";
import { Button } from "#/components/ui/button";
import { Ellipsis, MessageCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import ThreadAction from "./ThreadAction";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  comment: CommentThread;
}

export function CommentPin({ comment }: Props) {
  const editor = useEditor();
  const screen = editor.pageToScreen(comment?.pagePoint);
  const [isOpen, setIsOpen] = useState(true);

  const updateCommentPosition = useCommentStore((s) => s.updateThreadPosition);
  const deletePinComment = useCommentStore((s) => s.deleteThread);
  const setPlacing = useCommentStore((s) => s.setPlacing);
  const [editing, setEditing] = useState<string | null>(null);
  const resolveThread = useCommentStore((s) => s.resolveThread);

  const draggingRef = useRef<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      if (!draggingRef.current) return;

      const page = editor.screenToPage({
        x: e.clientX,
        y: e.clientY,
      });

      updateCommentPosition(draggingRef.current.id, {
        x: page.x - draggingRef.current.offsetX,
        y: page.y - draggingRef.current.offsetY,
      });
    }

    function handleUp() {
      draggingRef.current = null;
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [editor, updateCommentPosition]);

  useEffect(() => {
    if (!comment.messages[0].text) {
      setIsOpen(true);
    }
  }, [comment.messages.length]);

  useEffect(() => {
    if (!isOpen && !comment.messages[0].text) {
      deletePinComment(comment.id);
      setPlacing(false);
    }
  }, [isOpen, comment.messages[0].text]);

  const handleResolve = (threadId: string) => {
    resolveThread(threadId);
  };

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: screen.x,
        top: screen.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            size={"icon"}
            variant={"secondary"}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();

              const pointerPage = editor.screenToPage({
                x: e.clientX,
                y: e.clientY,
              });

              draggingRef.current = {
                id: comment.id,
                offsetX: pointerPage.x - comment.pagePoint.x,
                offsetY: pointerPage.y - comment.pagePoint.y,
              };
            }}
          >
            <MessageCircle />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="relative gap-0">
          {comment.messages[0]?.text && (
            <div className="absolute right-0 top-0">
              <ThreadAction
                handleResolve={handleResolve}
                resolved={comment.resolved}
                threadId={comment.id}
              />
            </div>
          )}

          <ScrollArea className=" *:data-radix-scroll-area-viewport:max-h-50 overflow-y-auto scrollbar-none!">
            {comment.messages[0]?.text &&
              comment.messages.map((message) => (
                <CommentItem
                  key={message.id}
                  message={message}
                  editing={editing}
                  setEditing={setEditing}
                  threadId={comment.id}
                />
              ))}
          </ScrollArea>

          {!editing && !comment.resolved && <CommentForm comment={comment} />}

          {comment.resolved && (
            <div className="pl-7">
              <Button
                onClick={() => handleResolve(comment.id)}
                variant={"secondary"}
                size="xs"
              >
                Re-Open Thread
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

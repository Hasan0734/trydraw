import { useEditor } from "tldraw";
import { useCommentStore } from "./comments.store";
import { useEffect, useRef } from "react";
import { Button } from "#/components/ui/button";
import { Ellipsis, MessageCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface Props {
  comment: {
    id: string;
    pagePoint: {
      x: number;
      y: number;
    };
  };
}

export function CommentPin({ comment }: Props) {
  const editor = useEditor();
  const screen = editor.pageToScreen(comment?.pagePoint);

  const updateCommentPosition = useCommentStore((s) => s.updateCommentPosition);

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

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: screen.x,
        top: screen.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Popover>
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
        <PopoverContent align="start" className="relative">
          <div className="absolute right-1 top-1">
            <Button variant={"ghost"} size={"icon-xs"} className="">
              <Ellipsis />
            </Button>
          </div>
          <CommentItem />
          <CommentItem />

          <CommentForm />
        </PopoverContent>
      </Popover>
    </div>
  );
}

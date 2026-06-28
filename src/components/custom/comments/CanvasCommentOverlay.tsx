import { Editor, HTMLContainer, useEditor, useValue } from "tldraw";
import { useCommentStore } from "./comments.store";
import { Button } from "#/components/ui/button";
import {
  EditIcon,
  Ellipsis,
  EllipsisVerticalIcon,
  MessageCircle,
  Search,
} from "lucide-react";
import { useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Input } from "#/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group";

export function CanvasCommentOverlay({ editor }: { editor: Editor }) {
  const comments = useCommentStore((s) => s.comments);

  // Re-render whenever camera changes
  useValue("camera", () => editor.getCamera(), [editor]);

  return (
    <HTMLContainer
      style={{
        pointerEvents: "none",
      }}
    >
      {comments.map((comment) => {
        console.log(screen, comment.pagePoint);
        return <CommentPin key={comment.id} comment={comment} />;
      })}
    </HTMLContainer>
  );
}

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
      <Popover modal={true}>
        <PopoverTrigger>
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
                  <EditIcon />
                </Button>
              </div>
            </div>
            <div className="absolute right-1 top-1">
              <Button variant={"ghost"} size={"icon-xs"} className="">
                <Ellipsis />
              </Button>
            </div>
            <p className="text-muted-foreground pl-7">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Avatar size="sm">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              <InputGroup className="w-full  rounded-sm has-[[data-slot=input-group-control]:focus-visible]:ring-0" >
                <InputGroupInput  placeholder="Comments, replay @mention " />
                <InputGroupAddon align={'inline-end'}>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              {/* <Input className="focus-visible:ring-0 rounded-sm h-7" /> */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

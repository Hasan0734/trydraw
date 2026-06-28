import { ClientOnly } from "@tanstack/react-router";
import {
  Editor,
  Tldraw,
  type TLBaseEventInfo,
  type TLEventHandlers,
  type TLEventInfo,
} from "tldraw";
import "tldraw/tldraw.css";
import LeftSidebar from "./LeftSidebar";
import { Spinner } from "./ui/spinner";
import BottomBar from "./BottomBar";
import { useCommentStore } from "./custom/comments/comments.store";
import { cn } from "#/lib/utils";
import { CanvasCommentOverlay } from "./custom/comments/CanvasCommentOverlay";
import { CommentCursor } from "./custom/comments/CommentCursor";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

const Whiteboard = () => {
  const placing = useCommentStore((state) => state.placing);
  const placed = useCommentStore((state) => state.placed);
  const setPlacing = useCommentStore((s) => s.setPlacing);
  const comments = useCommentStore((s) => s.comments);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [event, setEvent] = useState<TLBaseEventInfo | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   function down(e: PointerEvent) {
  //     if (!canvasRef.current?.contains(e.target as Node)) {
  //       console.log("Outside canvas");

  //       setPlacing(false)
  //     }
  //   }

  //   document.addEventListener("pointerdown", down);

  //   return () => document.removeEventListener("pointerdown", down);
  // }, []);

  return (
    <div
      ref={canvasRef}
      className={cn("relative h-screen w-screen cursor-pointer!")}
    >
      <ClientOnly fallback={<Loading />}>
        <Tldraw
          components={{
            Toolbar: null,
            MainMenu: null,
            PageMenu: null,
            HelpMenu: null,
            StylePanel: null,
            ActionsMenu: null,
            MenuPanel: null,
            ZoomMenu: null,
            NavigationPanel: null,
          }}
          className="cursor-none"
          onMount={(editor) => {
            setEditor(editor);
            editor.setColorMode("dark");
            if (placing) {
              editor.setCursor({ type: "none" });
            }

            editor.on("event", (info) => {
              if (info.type !== "pointer") return;
              if (info.name !== "pointer_down") return;
              const { placing } = useCommentStore.getState();
              if (!placing) return;

              setEvent(info);
              const point = editor.inputs.getCurrentPagePoint();
              console.log({ point });
              console.log({ info });
              useCommentStore.getState().setPlacing(false);
              useCommentStore.getState().setPlaced(true);
              const draft = {
                id: nanoid(8),
                text: "",
                pagePoint: point,
              };
              useCommentStore.getState().addComment(draft);

              editor.setCursor({ type: "default" });
            });

            editor.updateInstanceState({ isGridMode: true });
          }}
        >
          <LeftSidebar />
          <BottomBar />

          {editor && comments?.length > 0 && (
            <CanvasCommentOverlay editor={editor} />
          )}
        </Tldraw>

        {placing && editor && <CommentCursor editor={editor} />}
      </ClientOnly>
    </div>
  );
};

export default Whiteboard;

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <Spinner className="size-10" />
      </div>
    </div>
  );
};

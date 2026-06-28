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
import { cn } from "#/lib/utils";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useCommentStore } from "./comment/comments.store";
import { CanvasCommentOverlay } from "./comment/CanvasCommentOverlay";
import { CommentCursor } from "./comment/CommentCursor";

const Whiteboard = () => {
  const placing = useCommentStore((state) => state.placing);
  const setPlacing = useCommentStore((s) => s.setPlacing);
  const comments = useCommentStore((s) => s.comments);
  const [editor, setEditor] = useState<Editor | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);


  // click outside of canvas to false the placing
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement;
      if (target.className !== "tl-background" && placing) {
        useCommentStore.getState().setPlacing(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [canvasRef, placing]);


  // blur to hide comment cursor
  useEffect(() => {
    function handleBlur() {
      setPlacing(false);
    }
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // upate cursor
  useEffect(() => {
    if (!editor) return;

    editor.setCursor({
      type: placing ? "none" : "default",
    });
  }, [editor, placing]);

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
          onMount={(editor) => {
            setEditor(editor);
            editor.setColorMode("dark");
            // if (placing) {
            //   editor.setCursor({ type: "none" });
            // }

            editor.on("event", (info) => {
              if (info.type !== "pointer") return;
              if (info.name !== "pointer_down") return;
              const { placing } = useCommentStore.getState();
              if (!placing) return;

              const point = editor.inputs.getCurrentPagePoint();
              useCommentStore.getState().setPlacing(false);
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

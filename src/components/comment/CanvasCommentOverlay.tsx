import { Editor, HTMLContainer, useEditor, useValue } from "tldraw";
import { useCommentStore } from "./comments.store";
import { CommentPin } from "./CommentPin";


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
        return <CommentPin key={comment.id} comment={comment} />;
      })}
    </HTMLContainer>
  );
}

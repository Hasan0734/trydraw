import { MessageCircle } from "lucide-react";
import { Editor, useEditor, useValue } from "tldraw";

export function CommentCursor({editor}: {editor:Editor}) {

  const point = useValue(
    "pointer",
    () => editor.inputs.currentScreenPoint,
    [editor]
  );

  if (!point) return null;

  return (
    <div
      className="pointer-events-none fixed z-10"
      style={{
        left: point.x,
        top: point.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* 💬 */}
      <MessageCircle size={16} />
    </div>
  );
}
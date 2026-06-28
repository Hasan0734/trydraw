import { Minus, Plus, Redo, Undo } from "lucide-react";
import CommonButton from "./CommonButton";
import { Separator } from "./ui/separator";
import { useEditor, useValue } from "tldraw";

const EditorBottomControl = () => {
  const editor = useEditor();

  const zoomLevel = useValue(
    "zoom-level",
    () => Math.round(editor.getCamera().z * 100),
    [editor],
  );

  return (
    <div
      className={
        "absolute bottom-4 right-5 z-1000 bg-card p-1 rounded-xl shadow-xl border flex items-center gap-1 cursor-default"
      }
    >
      <CommonButton
        disabled={!editor.canUndo()}
        onClick={() => editor.undo()}
        tooltipContent="Undo"
      >
        <Undo />
      </CommonButton>
      <CommonButton
        disabled={!editor.canRedo()}
        onClick={() => editor.redo()}
        tooltipContent="Redo"
      >
        <Redo />
      </CommonButton>
      <Separator className="h-5!" orientation="vertical" />
      <div className="flex items-center gap-1">
        <CommonButton
          onClick={() => editor.zoomOut()}
          tooltipContent="Zoom Out"
        >
          <Minus />
        </CommonButton>
        <div>{zoomLevel}%</div>
        <CommonButton onClick={() => editor.zoomIn()} tooltipContent="Zoom In">
          <Plus />
        </CommonButton>
      </div>
    </div>
  );
};

export default EditorBottomControl;

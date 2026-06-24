import {
  Circle,
  CircleSlash,
  EllipsisVertical,
  MessageSquareText,
  MousePointer2,
  MoveUpRight,
  Pen,
  Shapes,
  Slash,
  Square,
  StickyNote,
  Type,
} from "lucide-react";
import { GeoShapeGeoStyle, useEditor, useValue } from "tldraw";
import CommonButton from "./CommonButton";
import { Separator } from "./ui/separator";

const BottomBar = () => {
  const editor = useEditor();

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );

  const currentGeoStyle = useValue(
    "currentGeoStyle",
    () => editor.getStyleForNextShape(GeoShapeGeoStyle),
    [editor],
  );

  return (
    <div className="absolute bottom-4 left-1/2 -translate-1/2 z-1000 bg-card p-1 rounded-xl shadow-xl border">
      <div className="flex  gap-1 items-center">
        <CommonButton
          onClick={() => editor.setCurrentTool("select")}
          tooltipContent="Shape"
        >
          <Shapes />
        </CommonButton>

        <CommonButton
          onClick={() => editor.setCurrentTool("select")}
          tooltipContent="Color"
        >
          <CircleSlash />
        </CommonButton>
        <CommonButton
          onClick={() => editor.setCurrentTool("select")}
          tooltipContent="Stroke"
        >
          <Shapes />
        </CommonButton>
        <Separator orientation="vertical" />
        <CommonButton
          onClick={() => editor.setCurrentTool("select")}
          tooltipContent="Comment"
        >
          <MessageSquareText />
        </CommonButton>
        <CommonButton
          onClick={() => editor.setCurrentTool("select")}
          tooltipContent="Comment"
        >
          <EllipsisVertical />
        </CommonButton>
      </div>
    </div>
  );
};

export default BottomBar;

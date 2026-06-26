import { useEditor, useValue } from "tldraw";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import ShapeFill from "./ShapeFill";
import ShapeFonts from "./ShapeFonts";
import ShapeOutline from "./ShapeOutline";
import ShapeOutlineSize from "./ShapeOutlineSize";
import ShapeTextAlign from "./ShapeTextAlign";
import LinePopoverContent from "./line/LinePopoverContent";

const StrokePopover = () => {
  const editor = useEditor();
  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();

      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );

  const hasGeoShape = selectedShapes.some((s) => s?.type === "geo");
  const hasTextShape = selectedShapes.some((s) => s?.type === "text");

  return (
    <PopoverContent className="p-1 w-37" sideOffset={10}>
      <div className="space-y-1">
        {(hasGeoShape || currentToolId === "geo") && <ShapeFill />}
        <ShapeOutline />
        <ShapeOutlineSize />
      </div>
      {(hasGeoShape || hasTextShape) && <Separator />}
      {(hasGeoShape || hasTextShape) && <ShapeFonts />}
      {(hasGeoShape || hasTextShape) && <ShapeTextAlign />}
    </PopoverContent>
  );
};

export default StrokePopover;

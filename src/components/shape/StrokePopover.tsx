import { useEditor, useValue } from "tldraw";
import { PopoverContent } from "../ui/popover";
import { Separator } from "../ui/separator";
import ShapeFill from "./ShapeFill";
import ShapeFonts from "./ShapeFonts";
import ShapeOutline from "./ShapeOutline";
import ShapeOutlineSize from "./ShapeOutlineSize";
import ShapeTextAlign from "./ShapeTextAlign";

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
  const hasNote = selectedShapes.some((s) => s?.type === "note");

  return (
    <PopoverContent className="p-1 w-37" sideOffset={10}>
      <div className="space-y-1">
        {(hasGeoShape || currentToolId === "geo") && <ShapeFill />}
        {hasGeoShape && <ShapeOutline />}
        <ShapeOutlineSize />
      </div>
      {(hasGeoShape || hasTextShape) && <Separator />}
      {(hasGeoShape || hasTextShape || hasNote) && <ShapeFonts />}
      {(hasGeoShape || hasTextShape || hasNote) && <ShapeTextAlign />}
    </PopoverContent>
  );
};

export default StrokePopover;

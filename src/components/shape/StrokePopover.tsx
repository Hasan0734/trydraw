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
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  return (
    <PopoverContent className="p-1 w-37" sideOffset={10}>
      <div className="space-y-1">
        <ShapeFill />
        <ShapeOutline />
        <ShapeOutlineSize />
      </div>
      <Separator />
      <ShapeFonts />
      {selectedShape?.type === "geo" && <ShapeTextAlign />}
      {selectedShape?.type === "arrow" && (
        <>
          <Separator />
          <Popover>
            <PopoverTrigger>Line</PopoverTrigger>
            <LinePopoverContent />
          </Popover>
          <Popover>
            <PopoverTrigger>Line</PopoverTrigger>
            <LinePopoverContent />
          </Popover>
        </>
      )}
    </PopoverContent>
  );
};

export default StrokePopover;

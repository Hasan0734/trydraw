import { PopoverContent } from "../ui/popover";
import { Separator } from "../ui/separator";
import ShapeFill from "./ShapeFill";
import ShapeFonts from "./ShapeFonts";
import ShapeOutline from "./ShapeOutline";
import ShapeOutlineSize from "./ShapeOutlineSize";
import ShapeTextAlign from "./ShapeTextAlign";

const StrokePopover = () => {
  return (
    <PopoverContent className="p-1 w-37">
      <div className="space-y-1">
        <ShapeFill />
        <ShapeOutline />
        <ShapeOutlineSize />
      </div>
      <Separator />
      <ShapeFonts />
      <ShapeTextAlign />
    </PopoverContent>
  );
};

export default StrokePopover;

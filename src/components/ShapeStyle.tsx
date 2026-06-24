import { DefaultColorStyle, useEditor } from "tldraw";
import CommonButton from "./CommonButton";
import {
  Shapes,
  CircleSlash,
  MessageSquareText,
  EllipsisVertical,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ShapeSelector from "./ShapeSelector";

const ShapeStyle = () => {
  const editor = useEditor();
  return (
    <div className="flex  gap-1 items-center">
      <Popover>
        <PopoverTrigger>
          <CommonButton
            onClick={() => editor.setCurrentTool("select")}
            tooltipContent="Shape"
          >
            <Shapes />
          </CommonButton>
        </PopoverTrigger>
        <ShapeSelector />
      </Popover>

      <CommonButton
        onClick={() =>
          editor.setStyleForSelectedShapes(DefaultColorStyle, "green")
        }
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
  );
};

export default ShapeStyle;

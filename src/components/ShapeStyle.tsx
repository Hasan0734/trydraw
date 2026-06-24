import { DefaultColorStyle, useEditor } from "tldraw";
import CommonButton from "./CommonButton";
import {
  Shapes,
  CircleSlash,
  MessageSquareText,
  EllipsisVertical,
  PaintBucket,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ShapeSelector from "./ShapeSelector";
import ColorPopover from "./ColorPopover";

const ShapeStyle = () => {
  const editor = useEditor();
  return (
    <div className="flex  gap-1 items-center">
      <Popover>
        <PopoverTrigger>
          <CommonButton tooltipContent="Shape">
            <Shapes />
          </CommonButton>
        </PopoverTrigger>
        <ShapeSelector />
      </Popover>

      <Popover>
        <PopoverTrigger>
          <CommonButton
            // onClick={() =>
            //   editor.setStyleForSelectedShapes(DefaultColorStyle, "eer")
            // }
            tooltipContent="Color"
          >
            <PaintBucket />
          </CommonButton>
        </PopoverTrigger>
        <ColorPopover />
      </Popover>
      <CommonButton
        onClick={() => editor.setCurrentTool("select")}
        tooltipContent="Stroke"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M11 5h2" />
          <path d="M15 12h6" />
          <path d="M19 5h2" />
          <path d="M3 12h6" />
          <path d="M3 19h18" />
          <path d="M3 5h2" />
        </svg>
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

// black: TLDefaultColor;
// grey: TLDefaultColor;
// 'light-violet': TLDefaultColor;
// violet: TLDefaultColor;
// blue: TLDefaultColor;
// 'light-blue': TLDefaultColor;
// yellow: TLDefaultColor;
// orange: TLDefaultColor;
// green: TLDefaultColor;
// 'light-green': TLDefaultColor;
// 'light-red': TLDefaultColor;
// red: TLDefaultColor;
// white: TLDefaultColor;

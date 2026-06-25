import CommonButton from "../CommonButton";
import { Shapes, PaintBucket } from "lucide-react";
import { Popover, PopoverTrigger } from "../ui/popover";
import ShapeSelector from "./ShapeSelector";
import ColorPopover from "./ColorPopover";
import StrokePopover from "./StrokePopover";

const ShapeStyle = () => {

  return (
    <>
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
          <CommonButton tooltipContent="Color">
            <PaintBucket />
          </CommonButton>
        </PopoverTrigger>
        <ColorPopover />
      </Popover>
      <Popover>
        <PopoverTrigger>
          <CommonButton tooltipContent="Stroke">
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
        </PopoverTrigger>
        <StrokePopover />
      </Popover>
    </>
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

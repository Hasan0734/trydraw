import CommonButton from "../CommonButton";
import { Shapes, PaintBucket, Slash } from "lucide-react";
import { Popover, PopoverTrigger } from "../ui/popover";
import ShapeSelector from "./ShapeSelector";
import ColorPopover from "./ColorPopover";
import StrokePopover from "./StrokePopover";
import { useEditor, useValue } from "tldraw";
import SplinePopoverContent from "./spline/SplinePopoverContent";
import LinePopoverContent from "./line/LinePopoverContent";
import ArrowPopoverContent from "./line/ArrowPopoverContent";
import LinePopover from "./line/LinePopoverContent";

const ShapeStyle = () => {
  const editor = useEditor();
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );

  console.log(selectedShape, currentToolId);

  return (
    <>
      {(selectedShape?.type === "geo" || currentToolId === "geo") && (
        <Popover>
          <PopoverTrigger>
            <CommonButton tooltipContent="Shape">
              <Shapes />
            </CommonButton>
          </PopoverTrigger>
          <ShapeSelector />
        </Popover>
      )}

      {(currentToolId === "arrow" || selectedShape?.type === "arrow") && (
        <>
          <Popover>
            <PopoverTrigger>
              <CommonButton tooltipContent="Spline ─ Cubic">
                <span
                  className="bg-white size-4 "
                  style={{
                    mask: `url(/assets/merged.svg#spline-cubic) center 100% / 100% no-repeat`,
                  }}
                ></span>
              </CommonButton>
            </PopoverTrigger>
            <SplinePopoverContent />
          </Popover>
          <LinePopover />
          <Popover>
            <PopoverTrigger>
              <CommonButton tooltipContent="Arrow ─ Arc">
                <span
                  className="bg-white size-4 "
                  style={{
                    mask: `url(/assets/merged.svg#arrowhead-none) center 100% / 100% no-repeat`,
                  }}
                ></span>
              </CommonButton>
            </PopoverTrigger>
            <ArrowPopoverContent />
          </Popover>
        </>
      )}

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

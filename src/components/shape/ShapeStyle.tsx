import CommonButton from "../CommonButton";
import { Shapes, PaintBucket } from "lucide-react";
import { Popover, PopoverTrigger } from "../ui/popover";
import ShapeSelector from "./ShapeSelector";
import ColorPopover from "./ColorPopover";
import StrokePopover from "./StrokePopover";
import { useEditor, useValue } from "tldraw";
import ArrowPopoverContent from "./line/ArrowPopoverContent";
import LinePopover from "./line/LinePopoverContent";
import SplinePopover from "./spline/SplinePopoverContent";

const ShapeStyle = () => {
  const editor = useEditor();

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );
  const selectedShapes = useValue(
    "selected-shapes",
    () => {
      const ids = editor.getSelectedShapeIds(); // Always safely exists
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const hasGeoShape = selectedShapes.some((s) => s?.type === "geo");
  const hasLine = selectedShapes.some((s) => s?.type === "line");
  const hasArrow = selectedShapes.some((s) => s?.type === "arrow");

  return (
    <>
      {(hasGeoShape || currentToolId === "geo") && <ShapeSelector />}

      {(currentToolId === "line" || hasLine) && <SplinePopover />}

      {(currentToolId === "arrow" || hasArrow) && (
        <>
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

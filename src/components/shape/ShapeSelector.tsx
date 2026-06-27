import { PopoverContent } from "../ui/popover";
import { GeoShapeGeoStyle, useEditor, useValue } from "tldraw";
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
  Circle,
  Cloud,
  Diamond,
  Heart,
  Hexagon,
  type LucideIcon,
  Octagon,
  Pentagon,
  Square,
  SquareCheck,
  SquareX,
  Star,
  Triangle,
} from "lucide-react";
import CommonButton from "../CommonButton";
import type { GeoShapeGeoStyle as GeoShapeType } from "#/lib/type";

const shapes = [
  {
    name: "Rectangle",
    icon: Square,
    type: "rectangle",
  },
  {
    name: "Ellipse",
    icon: Circle,
    type: "ellipse",
  },
  {
    name: "Triangle",
    icon: Triangle,
    type: "triangle",
  },
  {
    name: "Diamond",
    icon: Diamond,
    type: "diamond",
  },
  {
    name: "Star",
    icon: Star,
    type: "star",
  },
  {
    name: "Pentagon",
    icon: Pentagon,
    type: "pentagon",
  },
  {
    name: "Hexagon",
    icon: Hexagon,
    type: "hexagon",
  },
  {
    name: "Octagon",
    icon: Octagon,
    type: "octagon",
  },
  {
    name: "Arrow left",
    icon: ArrowBigLeft,
    type: "arrow-left",
  },
  {
    name: "Arrow up",
    icon: ArrowBigUp,
    type: "arrow-up",
  },
  {
    name: "Arrow down",
    icon: ArrowBigDown,
    type: "arrow-down",
  },
  {
    name: "Arrow right",
    icon: ArrowBigRight,
    type: "arrow-right",
  },
  {
    name: "Cloud",
    icon: Cloud,
    type: "cloud",
  },
  {
    name: "X box",
    icon: SquareX,
    type: "x-box",
  },
  {
    name: "Check box",
    icon: SquareCheck,
    type: "check-box",
  },
  {
    name: "Heart",
    icon: Heart,
    type: "heart",
  },
];
const ShapeSelector = () => {
  const editor = useEditor();
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);


  return (
    <PopoverContent className="max-w-37 p-1">
      <div className="grid grid-cols-4 gap-1">
        {shapes.map((shape) => {
          // @ts-ignore
          const isActive = shape.type === selectedShape?.props?.geo;
          return (
            <CommonButton
              key={shape.name}
              onClick={() => {
                if (!selectedShape) {
                  editor.setStyleForNextShapes(GeoShapeGeoStyle, shape.type);
                  editor.setCurrentTool("geo");
                  return;
                }

                editor.updateShape({
                  id: selectedShape.id,
                  type: "geo",
                  props: {
                    geo: shape.type as GeoShapeType,
                  },
                });
              }}

              active={isActive}
              tooltipContent={`Shape ─ ${shape.name}`}
            >
              <shape.icon />
            </CommonButton>
          );
        })}
      </div>
    </PopoverContent>
  );
};

export default ShapeSelector;

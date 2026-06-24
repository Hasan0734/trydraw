import { PopoverContent } from "./ui/popover";
import { useEditor } from "tldraw";
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
import CommonButton from "./CommonButton";
import type { GeoShapeGeoStyle } from "#/lib/type";

const shapes = [
  {
    name: "Shape -- Rectangle",
    icon: Square,
    type: "rectangle",
  },
  {
    name: "Shape -- Ellipse",
    icon: Circle,
    type: "ellipse",
  },
  {
    name: "Shape -- Triangle",
    icon: Triangle,
    type: "triangle",
  },
  {
    name: "Shape -- Diamond",
    icon: Diamond,
    type: "diamond",
  },
  {
    name: "Shape -- Star",
    icon: Star,
    type: "star",
  },
  {
    name: "Shape -- Pentagon",
    icon: Pentagon,
    type: "pentagon",
  },
  {
    name: "Shape -- Hexagon",
    icon: Hexagon,
    type: "hexagon",
  },
  {
    name: "Shape -- Octagon",
    icon: Octagon,
    type: "octagon",
  },
  {
    name: "Shape -- Arrow left",
    icon: ArrowBigLeft,
    type: "arrow-left",
  },
  {
    name: "Shape -- Arrow up",
    icon: ArrowBigUp,
    type: "arrow-up",
  },
  {
    name: "Shape -- Arrow down",
    icon: ArrowBigDown,
    type: "arrow-down",
  },
  {
    name: "Shape -- Arrow right",
    icon: ArrowBigRight,
    type: "arrow-right",
  },
  {
    name: "Shape -- Cloud",
    icon: Cloud,
    type: "cloud",
  },
  {
    name: "Shape -- X box",
    icon: SquareX,
    type: "x-box",
  },
  {
    name: "Shape -- Check box",
    icon: SquareCheck,
    type: "check-box",
  },
  {
    name: "Shape -- Heart",
    icon: Heart,
    type: "heart",
  },
];
const ShapeSelector = () => {
  const editor = useEditor();
  //   const shape = useValue("shape", () => editor.getOnlySelectedShape(), [
  //     editor,

  //   ]);

  const selectedShape = editor.getOnlySelectedShape();

  return (
    <PopoverContent className="max-w-37 p-1">
      <div className="grid grid-cols-4 gap-1">
        {shapes.map((shape) => {
          // @ts-ignore
          const isActive = shape.type === selectedShape?.props?.geo;
          return (
            <CommonButton
              onClick={() => {
                if (!selectedShape) return;

                editor.updateShape({
                  id: selectedShape.id, 
                  type: "geo", 
                  props: {
                    geo: shape.type as GeoShapeGeoStyle,
                  },
                });
              }}
              active={isActive}
              tooltipContent={shape.name}
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

interface ShapeItemProps {
  icon: LucideIcon;
  name: string;
  active: boolean;
}

// const ShapeItem = ({ icon: Icon, name }: ShapeItemProps) => {
//   return (
//     <Button className="" variant={"ghost"} size={"icon"}>
//       <Icon />
//     </Button>
//   );
// };

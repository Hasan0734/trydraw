import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  Octagon,
  Pentagon,
  Shapes,
  Square,
  SquareCheck,
  SquareX,
  Star,
  Triangle,
} from "lucide-react";
import CommonButton from "../CommonButton";
import type { GeoShapeGeoStyle as GeoShapeType } from "#/lib/type";
import { useRef } from "react";

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
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const activeShape = useValue(
    "active-shape",
    () => {
      const selectedIds = editor.getSelectedShapeIds();

      if (selectedIds.length > 0) {
        const liveShapes = selectedIds
          .map((id) => editor.getShape(id))
          .filter(Boolean);
        const firstShapeType = (liveShapes[0] as any)?.props?.geo;

        const allMatch = liveShapes.every(
          (shape) => (shape as any)?.props?.geo === firstShapeType,
        );

        if (allMatch && firstShapeType) return firstShapeType;
      }

      const currentTool = editor.getCurrentToolId();
      const instanceState = editor.getInstanceState();

      if (currentTool === "geo" || instanceState.isToolLocked) {
        return editor.getStyleForNextShape(GeoShapeGeoStyle) || "rectangle";
      }

      return editor.getStyleForNextShape(GeoShapeGeoStyle) || "rectangle";
    },
    [editor],
  );

  const handleShape = (type: GeoShapeType) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    clickTimeoutRef.current = setTimeout(() => {
      editor.updateInstanceState({ isToolLocked: false });

      if (selectedShapes.length) {
        const updates = selectedShapes
          .map((shape) => {
            if (!shape) return null;
            if (!("geo" in (shape.props || {}))) return null;

            const update: any = {
              id: shape.id,
              type: "geo",
              props: { ...shape.props, geo: type },
            };
            return update;
          })
          .filter(Boolean);

        editor.updateShapes(updates);
      } else {
        editor.run(() => {
          editor.setStyleForNextShapes(GeoShapeGeoStyle, type);
          editor.setCurrentTool("geo");
        });
      }
      clickTimeoutRef.current = null;
    }, 250);
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    toolId: string,
  ) => {
    e.stopPropagation();

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    editor.run(() => {
      editor.setStyleForNextShapes(GeoShapeGeoStyle, toolId);
      editor.setCurrentTool("geo");
    });
    editor.updateInstanceState({ isToolLocked: true });

    // OPTIONAL: If you ALSO meant locking the currently selected canvas shape:
    // editor.toggleLock()
  };

  const currentGeoStyle = useValue(
    "currentGeoStyle",
    () => editor.getStyleForNextShape(GeoShapeGeoStyle),
    [editor],
  );

  const currentActiveShapeConfig = shapes.find((s) => s.type === activeShape) ||
    shapes.find((s) => s.type === "rectangle") || {
      icon: Shapes,
      name: "Shape",
    }; // Global fallback icon

  const TriggerIcon = currentActiveShapeConfig.icon;

  return (
    <Popover>
      <PopoverTrigger>
        <CommonButton
          tooltipContent={`Shape ─ ${currentActiveShapeConfig.name}`}
        >
          <TriggerIcon />
        </CommonButton>
      </PopoverTrigger>

      <PopoverContent className="max-w-37 p-1">
        <div className="grid grid-cols-4 gap-1">
          {shapes.map((shape) => {
            // @ts-ignore
            const isActive = activeShape === shape.type;
            return (
              <CommonButton
                key={shape.name}
                onClick={() => handleShape(shape.type as GeoShapeType)}
                active={isActive}
                tooltipContent={`Shape ─ ${shape.name}`}
                onDoubleClick={(e) => handleDoubleClick(e, shape.type)}
              >
                <shape.icon />
              </CommonButton>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShapeSelector;

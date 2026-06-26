import CommonButton from "#/components/CommonButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { LineShapeSplineStyle, useEditor, useValue } from "tldraw";

const splines = [
  {
    title: "Line",
    svg: "spline-line",
    value: "line",
  },
  {
    title: "Cubic",
    svg: "spline-cubic",
    value: "cubic",
  },
];

const SplinePopover = () => {
  const editor = useEditor();
  const selectedShape = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      const shape = ids
        .map((id) => editor.getShape(id))
        .filter(Boolean)
        .find((s) => s?.type === "line");

      return shape;
    },
    [editor],
  );

  const handleLine = (line: "line" | "cubic") => {
    if (!selectedShape) {
      editor.setStyleForNextShapes(LineShapeSplineStyle, line);
      return;
    }

    editor.updateShape({
      ...selectedShape,
      props: {
        spline: line,
      } as any,
    });
  };

  const activeLine = selectedShape
    ? // @ts-ignore
      splines.find((line) => line.value === selectedShape.props.spline)
    : splines[0];

  return (
    <Popover>
      <PopoverTrigger>
        <CommonButton tooltipContent={`Spline ─ ${activeLine?.title}`}>
          <span
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#${activeLine?.svg}) center 100% / 100% no-repeat`,
            }}
          ></span>
        </CommonButton>
      </PopoverTrigger>

      <PopoverContent className="w-fit grid grid-cols-2 p-1" sideOffset={10}>
        {splines.map((line) => {
          const isActive = selectedShape
            ? // @ts-ignore
              selectedShape.props.spline === line.value
            : false;
          return (
            <CommonButton
              key={line.value}
              onClick={() => handleLine(line.value as "line" | "cubic")}
              tooltipContent={`Spline ─ ${line.title}`}
              active={isActive}
            >
              <span
                className="bg-foreground size-4 "
                style={{
                  mask: `url(/assets/merged.svg#${line.svg}) center 100% / 100% no-repeat`,
                }}
              ></span>
            </CommonButton>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default SplinePopover;

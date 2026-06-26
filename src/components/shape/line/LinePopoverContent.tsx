import CommonButton from "#/components/CommonButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import {
  ArrowShapeKindStyle,
  useEditor,
  useValue,
} from "tldraw";

const lines = [
  {
    title: "Arc",
    svg: "arrow-arc",
    value: "arc",
  },
  {
    title: "Elbow",
    svg: "arrow-elbow",
    value: "elbow",
  },
];

const LinePopover = () => {
  const editor = useEditor();
  const selectedShape = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      const shape = ids
        .map((id) => editor.getShape(id))
        .filter(Boolean)
        .find((s) => s?.type === "arrow");

      return shape;
    },
    [editor],
  );

  const handleLine = (line: string) => {
    if (!selectedShape) {
      editor.setStyleForNextShapes(ArrowShapeKindStyle, line);
      return;
    }

    editor.updateShape({
      ...selectedShape,
      props: {
        kind: line,
      } as any,
    });
  };

  const activeLine = selectedShape
    ? // @ts-ignore
      lines.find((line) => line.value === selectedShape.props.kind)
    : lines[0];

  return (
    <Popover>
      <PopoverTrigger>
        <CommonButton tooltipContent="Line ─ Arc">
          <span
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#arrow-${activeLine?.value}) center 100% / 100% no-repeat`,
            }}
          ></span>
        </CommonButton>
      </PopoverTrigger>

      <PopoverContent className="w-fit grid grid-cols-2 p-1" sideOffset={10}>
        {lines.map((line) => {
          const isActive = selectedShape
            ? // @ts-ignore
              selectedShape.props.kind === line.value
            : false;
          return (
            <CommonButton
              onClick={() => handleLine(line.value)}
              tooltipContent={`Line ─ ${line.title}`}
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

export default LinePopover;

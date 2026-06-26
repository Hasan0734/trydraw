import {
  DefaultHorizontalAlignStyle,
  DefaultVerticalAlignStyle,
  useEditor,
  useValue,
  type TLGeoShape,
  type TLTextShape,
} from "tldraw";
import CommonButton from "../CommonButton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const aligns = [
  {
    title: "Label ─ Start",
    svg: "horizontal-align-start",
    value: "start",
  },
  {
    title: "Label ─ Middle",
    svg: "horizontal-align-middle",
    value: "middle",
  },
  {
    title: "Label ─ End",
    svg: "horizontal-align-end",
    value: "end",
  },
  {
    title: "Vertical align ─ Middle",
    svg: "vertical-align-middle",
    value: "vertical-middle",
  },
];

const verticals = [
  {
    title: "Vertical ─ Top",
    svg: "vertical-align-start",
    value: "start",
  },
  {
    title: "Vertical ─ Middle",
    svg: "vertical-align-middle",
    value: "middle",
  },
  {
    title: "Vertical ─ Bottom",
    svg: "vertical-align-end",
    value: "end",
  },
];

const ShapeTextAlign = () => {
  const editor = useEditor();

  const selectedShape = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      const shape = ids
        .map((id) => editor.getShape(id))
        .filter(Boolean)
        .find((s) => s?.type === "text" || s?.type === "geo");

      return shape;
    },
    [editor],
  );

  const handleAlign = (align: string) => {
    if (selectedShape) {
      editor.updateShape({
        ...selectedShape,
        props: {
          align: align,
        } as any,
      });
      return;
    }
    editor.setStyleForNextShapes(DefaultHorizontalAlignStyle, align);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {aligns.map((align) => {
        if (align.value === "vertical-middle") {
          const vertical =
            verticals.find(
              // @ts-ignore
              (item) => item.value === selectedShape?.props.verticalAlign,
            ) || verticals[1];

          return (
            <Popover>
              <PopoverTrigger>
                <CommonButton
                  active={true}
                  key={vertical.svg}
                  tooltipContent={`${vertical.title}`}
                >
                  <div
                    className="bg-foreground size-4 "
                    style={{
                      mask: `url(/assets/merged.svg#${vertical.svg}) center 100% / 100% no-repeat`,
                    }}
                  ></div>
                </CommonButton>
              </PopoverTrigger>
              <VerticalAlignPopover selectedShape={selectedShape} />
            </Popover>
          );
        } else {
          const isActive = selectedShape
            ? // @ts-ignore
              selectedShape.props.align === align.value
            : false;
          return (
            <CommonButton
              key={align.svg}
              tooltipContent={`${align.title}`}
              onClick={() => handleAlign(align.value)}
              active={isActive}
            >
              <div
                className="bg-foreground size-4 "
                style={{
                  mask: `url(/assets/merged.svg#${align.svg}) center 100% / 100% no-repeat`,
                }}
              ></div>
            </CommonButton>
          );
        }
      })}
    </div>
  );
};

export default ShapeTextAlign;

const VerticalAlignPopover = ({
  selectedShape,
}: {
  selectedShape: TLGeoShape | TLTextShape | undefined;
}) => {
  const editor = useEditor();

  const handleVertical = (align: string) => {
    if (selectedShape) {
      editor.updateShape({
        ...selectedShape,
        props: {
          verticalAlign: align,
        } as any,
      });
      return;
    }
    editor.setStyleForNextShapes(DefaultVerticalAlignStyle, align);
  };
  return (
    <PopoverContent className="p-1 w-30" side="right" sideOffset={10}>
      <div className="grid grid-cols-3 gap-1">
        {verticals.map((vertical) => {
          const isActive = selectedShape
            ? // @ts-ignore
              selectedShape.props.verticalAlign === vertical.value
            : false;
          return (
            <CommonButton
              key={vertical.svg}
              tooltipContent={`${vertical.title}`}
              onClick={() => handleVertical(vertical.value)}
              active={isActive}
            >
              <div
                className="bg-white size-4 "
                style={{
                  mask: `url(/assets/merged.svg#${vertical.svg}) center 100% / 100% no-repeat`,
                }}
              ></div>
            </CommonButton>
          );
        })}
      </div>
    </PopoverContent>
  );
};

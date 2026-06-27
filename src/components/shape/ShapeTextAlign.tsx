import {
  DefaultHorizontalAlignStyle,
  DefaultVerticalAlignStyle,
  useEditor,
  useValue,
  type TLGeoShape,
  type TLShape,
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

  // const selectedShape = useValue(
  //   "selected-shape",
  //   () => {
  //     const ids = editor.getSelectedShapeIds();
  //     const shape = ids
  //       .map((id) => editor.getShape(id))
  //       .filter(Boolean)
  //       .find((s) => s?.type === "text" || s?.type === "geo");

  //     return shape;
  //   },
  //   [editor],
  // );

  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const activeAlign = useValue(
    "active-align",
    () => {
      const alignShapes = selectedShapes.filter(
        (shape) => shape && "align" in (shape.props || {}),
      );

      if (alignShapes.length > 0) {
        const firstShapeAlign = (alignShapes[0] as any)?.props?.align;

        const allMatch = alignShapes.every(
          (shape) => (shape as any)?.props?.align === firstShapeAlign,
        );

        return allMatch ? firstShapeAlign : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultHorizontalAlignStyle);
    },
    [editor, selectedShapes],
  );

  const handleAlign = (align: string) => {
    if (selectedShapes.length) {

      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;

          if (!("align" in (shape.props || {}))) return null;

          const update: any = {
            id: shape.id,
            type: shape.type,
            props: { ...shape.props, align: align },
          };
          return update;
        })
        .filter(Boolean);

      editor.updateShapes(updates);
      return;
    }
    editor.setStyleForNextShapes(DefaultHorizontalAlignStyle, align);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {aligns.map((align) => {
        const isActive = activeAlign === align.value;
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
      })}

      <VerticalAlign
        selectedShapes={selectedShapes}
      />
    </div>
  );
};

export default ShapeTextAlign;

const VerticalAlign = ({
  selectedShapes,
}: {
  selectedShapes: (TLShape | undefined)[];
}) => {
  const editor = useEditor();
  const activeAlign = useValue(
    "active-align",
    () => {
      const alignShapes = selectedShapes.filter(
        (shape) => shape && "verticalAlign" in (shape.props || {}),
      );

      if (alignShapes.length > 0) {
        const firstShapeAlign = (alignShapes[0] as any)?.props?.verticalAlign;

        const allMatch = alignShapes.every(
          (shape) => (shape as any)?.props?.verticalAlign === firstShapeAlign,
        );

        return allMatch ? firstShapeAlign : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultHorizontalAlignStyle);
    },
    [editor, selectedShapes],
  );

  const activeVerticalAlign =
    verticals.find((p) => p.value === activeAlign) ||
    verticals.find((p) => p.value === "middle");

  const handleVertical = (verticalAlign: string) => {
    if (selectedShapes.length) {
      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;

          if (!("verticalAlign" in (shape.props || {}))) return null;

          const update: any = {
            id: shape.id,
            type: shape.type,
            props: { ...shape.props, verticalAlign: verticalAlign },
          };
          return update;
        })
        .filter(Boolean);

      editor.updateShapes(updates);

      return;
    }
    editor.setStyleForNextShapes(DefaultVerticalAlignStyle, verticalAlign);
  };

  const isAnyPatternActive = verticals.some((p) => p.value === activeAlign);

  console.log(activeVerticalAlign);
  return (
    <Popover>
      <PopoverTrigger>
        <CommonButton
          active={isAnyPatternActive}
          tooltipContent={`${activeVerticalAlign?.title}`}
        >
          <div
            className="bg-foreground size-4 "
            style={{
              mask: `url(/assets/merged.svg#${activeVerticalAlign?.svg}) center 100% / 100% no-repeat`,
            }}
          ></div>
        </CommonButton>
      </PopoverTrigger>

      <PopoverContent className="p-1 w-30" side="right" sideOffset={10}>
        <div className="grid grid-cols-3 gap-1">
          {verticals.map((vertical) => {
            const isActive = activeAlign === vertical.value;
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
    </Popover>
  );
};



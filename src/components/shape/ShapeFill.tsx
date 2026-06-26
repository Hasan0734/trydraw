import CommonButton from "../CommonButton";
import { DefaultFillStyle, useEditor, useValue } from "tldraw";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const fills = [
  { title: "None", svg: "fill-none", value: "none" },
  { title: "Semi", svg: "fill-semi", value: "semi" },
  { title: "Solid", svg: "fill-solid", value: "solid" },
  // { title: "Pattern", svg: "fill-pattern", value: "pattern" },
];

const patterns = [
  { title: "Pattern", svg: "fill-pattern", value: "pattern" },
  { title: "Lined Fill", svg: "fill-lined-fill", value: "lined-fill" },
  { title: "Fill", svg: "fill-fill", value: "fill" },
];

const ShapeFill = () => {
  const editor = useEditor();

  // 1. Get currently selected shapes reactively
  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const activeFill = useValue(
    "active-fill",
    () => {
      const fillableShapes = selectedShapes.filter(
        (shape) => shape && "fill" in (shape.props || {}),
      );

      if (fillableShapes.length > 0) {
        const firstShapeFill = (fillableShapes[0] as any)?.props?.fill;

        const allMatch = fillableShapes.every(
          (shape) => (shape as any)?.props?.fill === firstShapeFill,
        );

        return allMatch ? firstShapeFill : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultFillStyle);
    },
    [editor, selectedShapes],
  );

  const handleFill = (fill: string) => {
    if (selectedShapes.length) {
      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;

          if (!("fill" in (shape.props || {}))) return null;

          const update: any = {
            id: shape.id,
            type: shape.type,
            props: { ...shape.props, fill: fill },
          };
          return update;
        })
        .filter(Boolean);

      editor.updateShapes(updates);
      return;
    }

    editor.setStyleForNextShapes(DefaultFillStyle, fill);
  };

  const activePattern =  patterns[0];

  return (
    <div className="grid grid-cols-4 gap-1">
      {fills.map((fill) => {
        const isActive = activeFill === fill.value;
        return (
          <CommonButton
            key={fill.value}
            tooltipContent={`Fill ─ ${fill.title}`}
            active={isActive}
            onClick={() => handleFill(fill.value)}
          >
            <div
              className="bg-foreground size-4 "
              style={{
                mask: `url(/assets/merged.svg#${fill.svg}) center 100% / 100% no-repeat`,
              }}
            ></div>
          </CommonButton>
        );
      })}

      <Popover>
        <PopoverTrigger>
          <CommonButton
            key={"pattern"}
            tooltipContent={`Fill ─ ${activePattern?.title}`}
          
          >
            <div
              className="bg-foreground size-4 "
              style={{
                mask: `url(/assets/merged.svg#${activePattern?.svg}) center 100% / 100% no-repeat`,
              }}
            ></div>
          </CommonButton>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className="w-fit grid grid-cols-3 p-1"
          sideOffset={5}
        >
          {patterns.map((pattern) => (
            <CommonButton
              key={"pattern"}
              tooltipContent={`Fill ─ ${pattern.title}`}
              active={activeFill === pattern.value}
              onClick={() => handleFill(pattern.value)}
            >
              <div
                className="bg-foreground size-4 "
                style={{
                  mask: `url(/assets/merged.svg#${pattern.svg}) center 100% / 100% no-repeat`,
                }}
              ></div>
            </CommonButton>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShapeFill;

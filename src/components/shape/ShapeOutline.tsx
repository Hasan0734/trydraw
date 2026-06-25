import CommonButton from "../CommonButton";
import { DefaultDashStyle, useEditor, useValue } from "tldraw";
import type { ShapeDash } from "#/lib/type";

const outlines = [
  {
    title: "Draw",
    svg: "dash-draw",
    value: "draw",
  },
  {
    title: "Dashed",
    svg: "dash-dashed",
    value: "dashed",
  },
  {
    title: "Dotted",
    svg: "dash-dotted",
    value: "dotted",
  },
  {
    title: "Solid",
    svg: "dash-solid",
    value: "solid",
  },
];

const ShapeOutline = () => {
  const editor = useEditor();
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  const handleOutline = (dash: ShapeDash) => {
    if (selectedShape) {
      editor.updateShape({
        ...selectedShape,
        props: {
          dash: dash,
        } as any,
      });
      return;
    }
    editor.setStyleForNextShapes(DefaultDashStyle, dash as ShapeDash);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {outlines.map((outline) => {
        const isActive = selectedShape
          ? // @ts-ignore
            selectedShape.props?.dash === outline.value
          : false;
        return (
          <CommonButton
            key={outline.value}
            tooltipContent={`Dash ─ ${outline.title}`}
            active={isActive}
            onClick={() => handleOutline(outline.value as ShapeDash)}
          >
            <div
              className="bg-foreground size-4 "
              style={{
                mask: `url(/assets/merged.svg#${outline.svg}) center 100% / 100% no-repeat`,
              }}
            ></div>
          </CommonButton>
        );
      })}
    </div>
  );
};

export default ShapeOutline;

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
  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      const shape = ids.map((id) => editor.getShape(id)).filter(Boolean);

      return shape;
    },
    [editor],
  );

  const activeOutline = useValue(
    "active-dash",
    () => {
      // Filter out shapes like 'text' or 'image' that do not have a dash prop
      const dashableShapes = selectedShapes.filter(
        (shape) => shape && "dash" in (shape.props || {}),
      );

      if (dashableShapes.length > 0) {
        const firstShapeOutline = (dashableShapes[0] as any)?.props?.dash;

        const allMatch = dashableShapes.every(
          (shape) => (shape as any)?.props?.dash === firstShapeOutline,
        );

        return allMatch ? firstShapeOutline : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultDashStyle);
    },
    [editor, selectedShapes],
  );

  const handleOutline = (dash: ShapeDash) => {
    if (selectedShapes.length) {
      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;

          if (!("dash" in (shape.props || {}))) return null;

          const update: any = {
            id: shape.id,
            type: shape.type,
            props: { ...shape.props, dash: dash },
          };
          return update;
        })
        .filter(Boolean);

      editor.updateShapes(updates);
      return;
    }
    editor.setStyleForNextShapes(DefaultDashStyle, dash as ShapeDash);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {outlines.map((outline) => {
        const isActive = activeOutline === outline.value;
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

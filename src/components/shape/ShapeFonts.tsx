import CommonButton from "../CommonButton";
import { DefaultFontStyle, useEditor, useValue } from "tldraw";

const fonts = [
  {
    title: "Draw",
    svg: "font-draw",
    value: "draw",
  },
  {
    title: "Sans",
    svg: "font-sans",
    value: "sans",
  },
  {
    title: "Serif",
    svg: "font-serif",
    value: "serif",
  },
  {
    title: "Mono",
    svg: "font-mono",
    value: "mono",
  },
];

const ShapeFonts = () => {
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

  const activeFont = useValue(
    "active-font",
    () => {
      if (selectedShapes.length > 0) {
        const firstShapeFont = (selectedShapes[0] as any)?.props?.font;
        const allMatch = selectedShapes.every(
          (shape) => (shape as any)?.props?.font === firstShapeFont,
        );

        return allMatch ? firstShapeFont : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultFontStyle);
    },
    [editor, selectedShapes],
  );

  const handleFont = (font: string) => {
    if (selectedShapes.length) {
      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;

          if (!("font" in (shape.props || {}))) return null;

          const update: any = {
            id: shape.id,
            type: shape.type,
            props: { ...shape.props, font: font },
          };
          return update;
        })
        .filter(Boolean);

      editor.updateShapes(updates);
      return;
    }

    editor.setStyleForNextShapes(DefaultFontStyle, font);
  };
  return (
    <div className="grid grid-cols-4 gap-1">
      {fonts.map((font) => {
        const isActive = activeFont === font.value;
        return (
          <CommonButton
            onClick={() => handleFont(font.value)}
            key={font.svg}
            tooltipContent={`Font ─ ${font.title}`}
            active={isActive}
          >
            <div
              className="bg-foreground size-4 "
              style={{
                mask: `url(/assets/merged.svg#${font.svg}) center 100% / 100% no-repeat`,
              }}
            ></div>
          </CommonButton>
        );
      })}
    </div>
  );
};

export default ShapeFonts;

import CommonButton from "../CommonButton";
import { DefaultSizeStyle, useEditor, useValue } from "tldraw";

const sizes = [
  {
    title: "Small",
    svg: "size-small",
    value: "s",
  },
  {
    title: "Medium",
    svg: "size-medium",
    value: "m",
  },
  {
    title: "Large",
    svg: "size-large",
    value: "l",
  },
  {
    title: "Extra large",
    svg: "size-extra-large",
    value: "xl",
  },
];

const ShapeOutlineSize = () => {
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

  const activeSize = useValue(
    "active-size",
    () => {
      if (selectedShapes.length > 0) {
        const firstShapeSize = (selectedShapes[0] as any)?.props?.size;
        const allMatch = selectedShapes.every(
          (shape) => (shape as any)?.props?.size === firstShapeSize,
        );

        return allMatch ? firstShapeSize : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultSizeStyle);
    },
    [editor, selectedShapes],
  );

  const handleSize = (size: string) => {
    if (selectedShapes.length) {
      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;

          const update: any = {
            id: shape.id,
            type: shape.type,
            props: { ...shape.props, size: size },
          };

          return update;
        })
        .filter(Boolean);
      editor.updateShapes(updates);

      return;
    }
    editor.setStyleForNextShapes(DefaultSizeStyle, size);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {sizes.map((size) => {
        const isActive = activeSize === size.value;
        return (
          <CommonButton
            onClick={() => handleSize(size.value)}
            key={size.svg}
            tooltipContent={`Size ─ ${size.title}`}
            active={isActive}
          >
            <div
              className="bg-foreground size-4 "
              style={{
                mask: `url(/assets/merged.svg#${size.svg}) center 100% / 100% no-repeat`,
              }}
            ></div>
          </CommonButton>
        );
      })}
    </div>
  );
};

export default ShapeOutlineSize;

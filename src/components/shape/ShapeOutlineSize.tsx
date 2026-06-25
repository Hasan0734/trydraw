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
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  const handleSize = (size: string) => {
    if (selectedShape) {
      editor.updateShape({
        ...selectedShape,
        props: {
          size: size,
        } as any,
      });
      return;
    }
    editor.setStyleForNextShapes(DefaultSizeStyle, size);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      {sizes.map((size) => {
        const isActive = selectedShape
          ? // @ts-ignore
            selectedShape.props.size === size.value
          : false;
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

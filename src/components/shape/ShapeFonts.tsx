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
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  const handleFont = (font: string) => {
    if (selectedShape) {
      editor.updateShape({
        ...selectedShape,
        props: {
          font: font,
        } as any,
      });
      return;
    }

    editor.setStyleForNextShapes(DefaultFontStyle, font);
  };
  return (
    <div className="grid grid-cols-4 gap-1">
      {fonts.map((font) => {
        const isActive = selectedShape
          ? // @ts-ignore
            selectedShape.props.font === font.value
          : false;
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

import CommonButton from "../CommonButton";
import { useEditor, useValue } from "tldraw";

const fills = [
  {
    title: "None",
    svg: "fill-none",
    value: "none",
  },
  {
    title: "Semi",
    svg: "fill-semi",
    value: "semi",
  },
  {
    title: "Solid",
    svg: "fill-solid",
    value: "solid",
  },
  {
    title: "Pattern",
    svg: "fill-pattern",
    value: "pattern",
  },
];

const ShapeFill = () => {
  const editor = useEditor();
  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  return (
    <div className="grid grid-cols-4 gap-1">
      {fills.map((fill) => (
        <CommonButton
          key={fill.value}
          tooltipContent={`Fill ─ ${fill.title}`}
          onClick={() => {
            if (selectedShape)
              editor.updateShape({
                ...selectedShape,
                props: {
                  fill: fill.value,
                } as any,
              });
          }}
        >
          <div
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#${fill.svg}) center 100% / 100% no-repeat`,
            }}
          ></div>
        </CommonButton>
      ))}
    </div>
  );
};

export default ShapeFill;

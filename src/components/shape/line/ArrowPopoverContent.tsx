import CommonButton from "#/components/CommonButton";
import { PopoverContent } from "#/components/ui/popover";
import { Separator } from "#/components/ui/separator";
import {
  ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle,
  useEditor,
  useValue,
} from "tldraw";

const allArrows = [
  {
    title: "None",
    svg: "arrowhead-none",
    value: "none",
  },
  {
    title: "Arrow",
    svg: "arrowhead-arrow",
    value: "arrow",
  },
  {
    title: "Triangle",
    svg: "arrowhead-triangle",
    value: "triangle",
  },
  {
    title: "Square",
    svg: "arrowhead-square",
    value: "square",
  },
  {
    title: "Dot",
    svg: "arrowhead-dot",
    value: "dot",
  },
  {
    title: "Diamond",
    svg: "arrowhead-diamond",
    value: "diamond",
  },
  {
    title: "Inverted",
    svg: "arrowhead-triangle-inverted",
    value: "inverted",
  },
  {
    title: "Bar",
    svg: "arrowhead-bar",
    value: "bar",
  },
];

const arrows = [
  {
    title: "Start",
    items: allArrows,
  },
  {
    title: "End",
    items: allArrows,
  },
];

const ArrowPopoverContent = () => {
  const editor = useEditor();

  const selectedShape = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      const shape = ids
        .map((id) => editor.getShape(id))
        .filter(Boolean)
        .find((s) => s?.type === "arrow");

      return shape;
    },
    [editor],
  );

  const handleArrow = (type: string, arrow: string) => {
    if (!selectedShape) {
      if (type === "Start") {
        editor.setStyleForNextShapes(ArrowShapeArrowheadStartStyle, arrow);
      } else {
        editor.setStyleForNextShapes(ArrowShapeArrowheadEndStyle, arrow);
      }
      return;
    }

    if (type === "Start") {
      editor.updateShape({
        ...selectedShape,
        props: {
          arrowheadStart: arrow,
        } as any,
      });

      return;
    }

    editor.updateShape({
      ...selectedShape,
      props: {
        arrowheadEnd: arrow,
      } as any,
    });
  };
  return (
    <PopoverContent className="w-37 p-1" sideOffset={10}>
      {arrows.map((arrow, index) => (
        <>
          <div key={arrow.title} className="grid grid-cols-4">
            <span className="col-span-4 text-sm text-muted-foreground">
              {arrow.title}
            </span>
            {arrow.items.map((item) => {
              const isActive = selectedShape
                ? // @ts-ignore
                  (arrow.title === "Start" &&
                    // @ts-ignore
                    selectedShape.props.arrowheadStart === item.value) ||
                  (arrow.title === "End" &&
                    // @ts-ignore
                    selectedShape.props.arrowheadEnd === item.value)
                : false;

              return (
                <CommonButton
                  key={item.svg}
                  tooltipContent={`${arrow.title} ─ ${item.title}`}
                  onClick={() => handleArrow(arrow.title, item.value)}
                  active={isActive}
                >
                  <span
                    className="bg-foreground size-4 "
                    style={{
                      mask: `url(/assets/merged.svg#${item.svg}) center 100% / 100% no-repeat`,
                      transform:
                        arrow.title === "Start" ? "scale(-1,1)" : "none",
                    }}
                  ></span>
                </CommonButton>
              );
            })}
          </div>
          {arrows.length !== index + 1 && <Separator />}
        </>
      ))}
    </PopoverContent>
  );
};

export default ArrowPopoverContent;

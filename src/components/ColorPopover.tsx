import { DefaultColorStyle, useEditor, useValue } from "tldraw";
import CommonButton from "./CommonButton";
import { PopoverContent } from "./ui/popover";

const colors = [
  {
    name: "Grey",
    value: "grey",
    hash: "#9398b0",
  },
  {
    name: "Light violet",
    value: "light-violet",
    hash: "#e599f7",
  },
  {
    name: "Violet",
    value: "violet",
    hash: "#ae3ec9",
  },
  {
    name: "Blue",
    value: "blue",
    hash: "#4f72fc",
  },
  {
    name: "Light blue",
    value: "light-blue",
    hash: "#4dabf7",
  },
  {
    name: "Yellow",
    value: "yellow",
    hash: "#ffc034",
  },
  {
    name: "Orange",
    value: "orange",
    hash: "#f76707",
  },
  {
    name: "Green",
    value: "green",
    hash: "#099268",
  },
  {
    name: "Light green",
    value: "light-green",
    hash: "#40c057",
  },
  {
    name: "Light red",
    value: "light-red",
    hash: "#ff8787",
  },
  {
    name: "Red",
    value: "red",
    hash: "#e03131",
  },
];

const ColorPopover = () => {
  const editor = useEditor();

  const isDark = editor.user.getUserPreferences().colorScheme === "dark";

  const copyColors = [...colors];

  copyColors.unshift({
    name: isDark ? "White" : "Black",
    value: isDark ? "white" : "black",
    hash: isDark ? "white" : "black",
  });

  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  console.log(selectedShape);

  return (
    <PopoverContent className="w-37">
      <div className="grid grid-cols-4 gap-1">
        {copyColors.map((color) => {
          // @ts-ignore
          const isActive = selectedShape?.props?.color === color.value;

          return (
            <CommonButton
              active={isActive}
              key={color.name}
              tooltipContent={`Color ─ ${color.name}`}
              onClick={() => {
                if (!selectedShape) {
                  editor.setStyleForNextShapes(DefaultColorStyle, color.value);

                  return;
                }

                editor.updateShape({
                  ...selectedShape,
                  props: {
                    ...selectedShape.props,
                    // @ts-ignore
                    color: color.value,
                  },
                });
              }}
            >
              <span
                className="size-4 rounded-full"
                style={{ background: color.hash }}
              ></span>
            </CommonButton>
          );
        })}
      </div>
    </PopoverContent>
  );
};

export default ColorPopover;

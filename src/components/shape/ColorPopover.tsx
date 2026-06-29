import { DefaultColorStyle, useEditor, useValue } from "tldraw";
import CommonButton from "../CommonButton";
import { PopoverContent } from "../ui/popover";

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
  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();

      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const activeColor = useValue(
    "active-color",
    () => {
      // Filter out shapes like 'text' or 'image' that do not have a dash prop
      const dashableShapes = selectedShapes.filter(
        (shape) => shape && "color" in (shape.props || {}),
      );

      if (dashableShapes.length > 0) {
        const firstShapeColor = (dashableShapes[0] as any)?.props?.color;

        const allMatch = dashableShapes.every(
          (shape) => (shape as any)?.props?.color === firstShapeColor,
        );

        return allMatch ? firstShapeColor : null;
      }

      const sharedStyles = editor.getSharedStyles();
      return sharedStyles.get(DefaultColorStyle);
    },
    [editor, selectedShapes],
  );

  const isDark = editor.user.getUserPreferences().colorScheme === "dark";

  const copyColors = [...colors];

  copyColors.unshift({
    name: isDark ? "White" : "Black",
    value: isDark ? "white" : "black",
    hash: isDark ? "white" : "black",
  });

  const handleColor = (color: string) => {
    if (!selectedShapes.length) {
      editor.setStyleForNextShapes(DefaultColorStyle, color);
      return;
    }

    const updates = selectedShapes
      .map((shape) => {
        if (!shape) return null;
        if (!("color" in (shape.props || {}))) return null;

        const update: any = {
          id: shape.id,
          type: shape.type,
          props: {
            ...shape.props,
            color,
          },
        };
        return update;
      })
      .filter(Boolean);
    editor.updateShapes(updates);
  };

  return (
    <PopoverContent
      className="w-37 p-1"
      align="start"
      alignOffset={-40}
      sideOffset={10}
    >
      <div className="grid grid-cols-4 gap-1">
        {copyColors.map((color) => {
          // @ts-ignore
          const isActive = activeColor === color.value;

          return (
            <CommonButton
              active={isActive}
              key={color.name}
              tooltipContent={`Color ─ ${color.name}`}
              onClick={() => handleColor(color.value)}
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

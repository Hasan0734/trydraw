import { Slider } from "../ui/slider";
import { useState } from "react";
import { useEditor, useValue } from "tldraw";
const ShapeOpacity = () => {
  const editor = useEditor();

  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();

      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const [value, setValue] = useState([1]);

  const handleOpacity = (v: number[]) => {
    setValue(v);

    if (selectedShapes.length) {
      const updates = selectedShapes
        .map((shape) => {
          if (!shape) return null;
          const update: any = {
            id: shape.id,
            type: shape.type,
            opacity: v[0],
          };
          return update;
        })
        .filter(Boolean);
      editor.updateShapes(updates);
      return;
    }
    editor.setOpacityForNextShapes(v[0]);
  };

  return (
    <div className="px-2 mb-3 space-y-2">
      <div className="flex justify-between text-xs">
        <span>Opacity</span> <span>{value}</span>
      </div>
      <Slider
        value={value}
        onValueChange={handleOpacity}
        min={0.25}
        max={1}
        step={0.25}
        className="mx-auto w-full max-w-xs"
      />
    </div>
  );
};

export default ShapeOpacity;

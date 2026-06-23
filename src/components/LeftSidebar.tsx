import {
  Circle,
  MousePointer2,
  MoveUpRight,
  Pen,
  Slash,
  Square,
  StickyNote,
  Type,
} from "lucide-react";
import { GeoShapeGeoStyle, useEditor, useValue } from "tldraw";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const editor = useEditor();

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );

  const currentGeoStyle = useValue(
    "currentGeoStyle",
    () => editor.getStyleForNextShape(GeoShapeGeoStyle),
    [editor],
  );

  const selectRectangle = () => {
    editor.run(() => {
      editor.setStyleForNextShapes(GeoShapeGeoStyle, "rectangle");
      editor.setCurrentTool("geo");
    });
  };

  const selectEllipse = () => {
    editor.run(() => {
      editor.setStyleForNextShapes(GeoShapeGeoStyle, "ellipse");
      editor.setCurrentTool("geo");
    });
  };

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-1000 flex flex-col gap-2 bg-card p-2 rounded-2xl shadow-xl border">
      <Button
        variant={currentToolId === "select" ? "secondary" : "ghost"}
        onClick={() => editor.setCurrentTool("select")}
        size={"icon"}
      >
        <MousePointer2 />
      </Button>

      <Button
        variant={
          currentToolId === "geo" && currentGeoStyle === "rectangle"
            ? "secondary"
            : "ghost"
        }
        onClick={selectRectangle}
        size={"icon"}
      >
        <Square />
      </Button>
      <Button
        variant={
          currentToolId === "geo" && currentGeoStyle === "ellipse"
            ? "secondary"
            : "ghost"
        }
        onClick={selectEllipse}
        size={"icon"}
      >
        <Circle />
      </Button>
      <Button
        variant={currentToolId === "arrow" ? "secondary" : "ghost"}
        onClick={() => editor.setCurrentTool("arrow")}
        size={"icon"}
      >
        <MoveUpRight />
      </Button>
      <Button
        variant={currentToolId === "line" ? "secondary" : "ghost"}
        onClick={() => editor.setCurrentTool("line")}
        size={"icon"}
      >
        <Slash />
      </Button>
      <Button
        variant={currentToolId === "draw" ? "secondary" : "ghost"}
        onClick={() => editor.setCurrentTool("draw")}
        size={"icon"}
      >
        <Pen />
      </Button>
      <Button
        variant={currentToolId === "text" ? "secondary" : "ghost"}
        onClick={() => editor.setCurrentTool("text")}
        size={"icon"}
      >
        <Type />
      </Button>
      <Button
        variant={currentToolId === "note" ? "secondary" : "ghost"}
        onClick={() => editor.setCurrentTool("note")}
        size={"icon"}
      >
        <StickyNote />
      </Button>
    </div>
  );
};

export default LeftSidebar;

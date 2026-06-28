import {
  Circle,
  MessageCircle,
  MousePointer2,
  MoveUpRight,
  Pen,
  Slash,
  Square,
  StickyNote,
  Type,
} from "lucide-react";
import { GeoShapeGeoStyle, useEditor, useValue } from "tldraw";
import CommonButton from "./CommonButton";
import { useCommentStore } from "./comment/comments.store";

const LeftSidebar = () => {
  const setPlacing = useCommentStore((s) => s.setPlacing);
  const isPlacing = useCommentStore((s) => s.placing);

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
    <div id="left-sidebar" className="left-sidebar absolute cursor-default left-4 top-1/2 -translate-y-1/2 z-1000 flex flex-col gap-1 bg-card p-1 rounded-xl shadow-xl border">
      <CommonButton
        active={currentToolId === "select"}
        onClick={() => editor.setCurrentTool("select")}
        side={"right"}
        tooltipContent="Select ─ S"
      >
        <MousePointer2 />
      </CommonButton>

      <CommonButton
        active={currentToolId === "geo" && currentGeoStyle === "rectangle"}
        onClick={selectRectangle}
        side={"right"}
        tooltipContent="Rectangle ─ E"
      >
        <Square />
      </CommonButton>
      <CommonButton
        active={currentToolId === "geo" && currentGeoStyle === "ellipse"}
        onClick={selectEllipse}
        side={"right"}
        tooltipContent="Ellipse ─ E"
      >
        <Circle />
      </CommonButton>
      <CommonButton
        active={currentToolId === "arrow"}
        onClick={() => editor.setCurrentTool("arrow")}
        side="right"
        tooltipContent="Arrow ─ A"
      >
        <MoveUpRight />
      </CommonButton>
      <CommonButton
        active={currentToolId === "line"}
        onClick={() => editor.setCurrentTool("line")}
        tooltipContent="Line ─ L"
        side="right"
      >
        <Slash />
      </CommonButton>
      <CommonButton
        tooltipContent="Draw ─ D"
        active={currentToolId === "draw"}
        onClick={() => editor.setCurrentTool("draw")}
        side="right"
      >
        <Pen />
      </CommonButton>

      <CommonButton
        onClick={() => editor.setCurrentTool("text")}
        tooltipContent="Text ─ T"
        active={currentToolId === "text"}
        side="right"
      >
        <Type />
      </CommonButton>

      <CommonButton
        onClick={() => editor.setCurrentTool("note")}
        tooltipContent="Note ─ N"
        active={currentToolId === "note"}
        side="right"
      >
        <StickyNote />
      </CommonButton>
      <CommonButton
        active={isPlacing}
        onClick={() => {
          setPlacing(true);
          editor.setCursor({ type: "none" });
        }}
        tooltipContent="Comment"
        side="right"
      >
        <MessageCircle />
      </CommonButton>
    </div>
  );
};

export default LeftSidebar;

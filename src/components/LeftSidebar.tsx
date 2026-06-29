import {
  Circle,
  Hand,
  ImageIcon,
  MessageCircle,
  MousePointer2,
  MoveUpRight,
  Pen,
  Scan,
  Slash,
  Square,
  StickyNote,
  Type,
} from "lucide-react";
import {
  AssetRecordType,
  DefaultImageToolbar,
  GeoShapeGeoStyle,
  useEditor,
  useUiEvents,
  useValue,
} from "tldraw";
import CommonButton from "./CommonButton";
import { useCommentStore } from "./comment/comments.store";

const LeftSidebar = () => {
  const setPlacing = useCommentStore((s) => s.setPlacing);
  const isPlacing = useCommentStore((s) => s.placing);

  const editor = useEditor();
  const trackEvent = useUiEvents();

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
  const selectFrame = () => {
    editor.run(() => {
      // editor.setStyleForNextShapes(, "frame");
      editor.setCurrentTool("frame");
    });
  };


  const handleUploadClick = () => {
    if (!editor) return;

    // Standard HTML file input creation on-the-fly
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        const img = new Image();

        img.onload = () => {
          const assetId = AssetRecordType.createId();

          // Step 1: Register your image binary asset
          editor.createAssets([
            {
              id: assetId,
              type: "image",
              typeName: "asset",
              props: {
                name: file.name,
                src,
                w: img.width,
                h: img.height,
                mimeType: file.type,
                isAnimated: false,
              },
              meta: {},
            },
          ]);

          // Step 2: Render it directly at the center of the user's view screen
          const center = editor.getViewportPageBounds().center;
          editor.createShape({
            type: "image",
            x: center.x - img.width / 4,
            y: center.y - img.height / 4,
            props: {
              assetId,
              w: img.width / 2,
              h: img.height / 2,
            },
          });
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <div
      id="left-sidebar"
      className="left-sidebar absolute cursor-default left-4 top-1/2 -translate-y-1/2 z-1000 flex flex-col gap-1 bg-card p-1 rounded-xl shadow-xl border"
    >
      <CommonButton
        active={currentToolId === "select"}
        onClick={() => editor.setCurrentTool("select")}
        side={"right"}
        tooltipContent="Select ─ V"
      >
        <MousePointer2 />
      </CommonButton>
      <CommonButton
        active={currentToolId === "hand"}
        onClick={() => editor.setCurrentTool("hand")}
        side={"right"}
        tooltipContent="Hand ─ H"
      >
        <Hand />
      </CommonButton>

      <CommonButton
        active={currentToolId === "geo" && currentGeoStyle === "rectangle"}
        onClick={selectRectangle}
        side={"right"}
        tooltipContent="Rectangle ─ R"
      >
        <Square />
      </CommonButton>
      <CommonButton
        active={currentToolId === "geo" && currentGeoStyle === "rectangle"}
        onClick={selectFrame}
        side={"right"}
        tooltipContent="Frame ─ F"
      >
        <Scan />
      </CommonButton>

      {/* <CommonButton
        active={currentToolId === "geo" && currentGeoStyle === "ellipse"}
        onClick={selectEllipse}
        side={"right"}
        tooltipContent="Ellipse ─ E"
      >
        <Circle />
      </CommonButton> */}

      <CommonButton
        onClick={handleUploadClick}
        side={"right"}
        tooltipContent="Image ─ ⌘U"
      >
        <ImageIcon />
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

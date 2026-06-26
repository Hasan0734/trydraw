import {
  Circle,
  CircleSlash,
  EllipsisVertical,
  Eraser,
  MessageSquareText,
  MousePointer2,
  MoveUpRight,
  Pen,
  Shapes,
  Slash,
  Square,
  StickyNote,
  Type,
} from "lucide-react";
import { GeoShapeGeoStyle, useEditor, useValue } from "tldraw";
import CommonButton from "./CommonButton";
import { Separator } from "./ui/separator";
import TextStyle from "./TextStyle";
import ShapeStyle from "./shape/ShapeStyle";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "#/lib/utils";

const BottomBar = () => {
  const editor = useEditor();

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );

  const selectedShape = useValue("shape", () => editor.getOnlySelectedShape(), [
    editor,
  ]);

  const selectedShapes = useValue(
    "selected-shapes",
    () => {
      const ids = editor.getSelectedShapeIds(); // Always safely exists
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );



  const PARENT_CLASS =
    "absolute bottom-4 left-1/2 -translate-1/2 z-1000 bg-card p-1 rounded-xl shadow-xl border";


  const access = ["arrow", "line", "geo", "text"];

  console.log(selectedShapes)


  return (
    <>
      <AnimatePresence initial={false}>
        {(access.includes(currentToolId) || selectedShapes.length) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={cn("flex  gap-1 items-center", PARENT_CLASS)}
          >
            <ShapeStyle />


            <CommonButton
              active={currentToolId === "eraser"}
              onClick={() => {
                editor.setCurrentTool("eraser");
              }}
              tooltipContent="Eraser"
            >
              <Eraser />
            </CommonButton>
            <Separator orientation="vertical" className="h-5!" />
            <CommonButton
              onClick={() => editor.setCurrentTool("select")}
              tooltipContent="Comment"
            >
              <MessageSquareText />
            </CommonButton>
            <CommonButton
              onClick={() => editor.setCurrentTool("select")}
              tooltipContent="Comment"
            >
              <EllipsisVertical />
            </CommonButton>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <AnimatePresence initial={false}>
        {selectedShape?.type === "text" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={PARENT_CLASS}
          >
            <TextStyle />
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};

export default BottomBar;

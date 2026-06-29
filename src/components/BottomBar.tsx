import { Copy, EllipsisVertical, Eraser, Trash } from "lucide-react";
import { useEditor, useValue } from "tldraw";
import CommonButton from "./CommonButton";
import { Separator } from "./ui/separator";
import ShapeStyle from "./shape/ShapeStyle";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "#/lib/utils";
import EditorBottomControl from "./EditorBottomControl";

const BottomBar = () => {
  const editor = useEditor();

  const currentToolId = useValue(
    "currentToolId",
    () => editor.getCurrentToolId(),
    [editor],
  );

  const selectedShapes = useValue(
    "selected-shapes",
    () => {
      const ids = editor.getSelectedShapeIds(); // Always safely exists
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const PARENT_CLASS =
    "absolute bottom-4 left-1/2 -translate-x-1/2 z-1000 bg-card p-1 rounded-xl shadow-xl border cursor-default";

  const access = ["arrow", "line", "geo", "text", "draw"];

  const selectedShapesIds = editor.getSelectedShapeIds();
  const hasImage = selectedShapes.some((s) => s?.type === "image");

  console.log(selectedShapes);
  return (
    <>
      <AnimatePresence initial={false}>
        {(access.includes(currentToolId) || selectedShapes.length && !hasImage) && (
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
            {selectedShapesIds.length > 0 && (
              <>
                <CommonButton
                  onClick={() => {
                    const selectionBounds = editor.getSelectionPageBounds();

                    if (selectionBounds) {
                      const offsetX = selectionBounds.width + 15;
                      const offsetY = 0;

                      editor.duplicateShapes(selectedShapesIds, {
                        x: offsetX,
                        y: offsetY,
                      });
                    }
                  }}
                  tooltipContent="Duplicate"
                >
                  <Copy />
                </CommonButton>
                <CommonButton
                  onClick={() => {
                    editor.deleteShapes(selectedShapesIds);
                  }}
                  tooltipContent="Delete"
                >
                  <Trash />
                </CommonButton>
              </>
            )}
            {/* <CommonButton
              onClick={() => editor.setCurrentTool("select")}
              tooltipContent="Comment"
            >
              <MessageSquareText />
            </CommonButton> */}
            <CommonButton
              onClick={() => editor.setCurrentTool("select")}
              tooltipContent="Comment"
            >
              <EllipsisVertical />
            </CommonButton>
          </motion.div>
        )}
      </AnimatePresence>
      <EditorBottomControl />
    </>
  );
};

export default BottomBar;

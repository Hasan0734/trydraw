import {
  useEditor,
  track,
  DefaultSizeStyle,
  Box,
  TldrawUiContextualToolbar,
  TldrawUiToolbarButton,
  TldrawUiButtonIcon,
} from "tldraw";
import { Button } from "./ui/button";
import { MessageCircleIcon } from "lucide-react";

const SIZES = [
  { value: "s", icon: "size-small" },
  { value: "m", icon: "size-medium" },
  { value: "l", icon: "size-large" },
  { value: "xl", icon: "size-extra-large" },
] as const;
export const ContextualToolbarComponent = track(() => {
  const editor = useEditor();
  const showToolbar = editor.isIn("select.idle");

  // [2]
  const size = editor.getSharedStyles().get(DefaultSizeStyle);
  if (!size || !showToolbar) return null;
  const currentSize = size.type === "shared" ? size.value : undefined;

  // [3]
  const getSelectionBounds = () => {
    const fullBounds = editor.getSelectionRotatedScreenBounds();
    if (!fullBounds) return undefined;
    return new Box(fullBounds.x, fullBounds.y, fullBounds.width, 0);
  };

  return (
      <TldrawUiContextualToolbar
        getSelectionBounds={getSelectionBounds}
        label="Sizes"
        className=""
      >
       <div className="px-3 bg-card py-px">
         {SIZES.map(({ value, icon }) => {
          return (
            <Button
            className="bg-secondary! text-white"
            variant={'ghost'}
            size={'icon'}
              key={value}
              title={value.toUpperCase()}
              // isActive={value === currentSize}
              onClick={() =>
                editor.setStyleForSelectedShapes(DefaultSizeStyle, value)
              }
            >
                <MessageCircleIcon/>
              {/* <TldrawUiButtonIcon small icon={icon} /> */}
            </Button>
          );
        })}
       </div>
      </TldrawUiContextualToolbar>
  );
});

import React, { act } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CommonButton from "./CommonButton";
import { EllipsisVertical } from "lucide-react";
import { useActions, useEditor, useValue } from "tldraw";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const BottomActionMenu = () => {
  const editor = useEditor();
  const actions = useActions();
  const selectedShapes = useValue(
    "selected-shape",
    () => {
      const ids = editor.getSelectedShapeIds();
      return ids.map((id) => editor.getShape(id)).filter(Boolean);
    },
    [editor],
  );

  const ACTIONS = [
    {
      title: "Cut",
      shortcut: "⌘ X",
      onClick: () => {
        actions["cut"].onSelect("menu");
      },
    },
    {
      title: "Copy",
      shortcut: "⌘ C",
      onClick: () => {
        actions["copy"].onSelect("menu");
      },
    },
    // {
    //   title: "Paste",
    //   shortcut: "⌘ V",
    //   onClick: () => {},
    // },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CommonButton
          onClick={() => editor.setCurrentTool("select")}
          tooltipContent="Comment"
        >
          <EllipsisVertical />
        </CommonButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="center" sideOffset={10}>
        <DropdownMenuGroup>
          <Reorder />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {ACTIONS.map((action) => (
            <DropdownMenuItem onClick={action.onClick}>
              {action.title}
              <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CopyAs />
          <ExportAs />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BottomActionMenu;

const CopyAs = () => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Copy as</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40" align="end" sideOffset={8}>
          <DropdownMenuItem>SVG</DropdownMenuItem>
          <DropdownMenuItem>
            PNG <DropdownMenuShortcut>⌘ ⇧ C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex items-center gap-2 text-sm py-2">
            <Switch id="transparent" />
            <Label htmlFor="transparent">Transparent</Label>
          </div>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const ExportAs = () => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Export as</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40" align="end" sideOffset={8}>
          <DropdownMenuItem>SVG</DropdownMenuItem>
          <DropdownMenuItem>PNG</DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex items-center gap-2 text-sm py-2">
            <Switch id="transparent" />
            <Label htmlFor="transparent">Transparent</Label>
          </div>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const Edit = () => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40" align="end" sideOffset={8}>
          <DropdownMenuItem>
            Bring to front <DropdownMenuShortcut>]</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Bring forward <DropdownMenuShortcut>⌥ ]</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Send backward <DropdownMenuShortcut>⌥ [</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Send to back <DropdownMenuShortcut>[</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const Reorder = () => {
  const editor = useEditor();
  const selectedShapes = editor.getSelectedShapeIds();
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Reorder</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40" align="end" sideOffset={8}>
          <DropdownMenuItem
            onClick={() => {
              editor.bringToFront(selectedShapes);
            }}
          >
            Bring to front <DropdownMenuShortcut>]</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.bringToFront(selectedShapes);
            }}
          >
            Bring forward <DropdownMenuShortcut>⌥ ]</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.sendBackward(selectedShapes);
            }}
          >
            Send backward <DropdownMenuShortcut>⌥ [</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              editor.sendToBack(selectedShapes);
            }}
          >
            Send to back <DropdownMenuShortcut>[</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

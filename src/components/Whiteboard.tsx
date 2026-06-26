import { ClientOnly } from "@tanstack/react-router";
import {
  DefaultColorStyle,
  DefaultDashStyle,
  DefaultSizeStyle,
  Tldraw,
} from "tldraw";
import "tldraw/tldraw.css";
import WorkspaceUI from "./WorkspaceUI";
import LeftSidebar from "./LeftSidebar";
import { Spinner } from "./ui/spinner";
import BottomBar from "./BottomBar";

const Whiteboard = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <ClientOnly fallback={<Loading />}>
        <Tldraw
          components={{
            Toolbar: null,
            MainMenu: null,
            PageMenu: null,
            HelpMenu: null,
            ActionsMenu: null,
            MenuPanel: null,
            ZoomMenu: null,
            NavigationPanel: null,
          }}
          onMount={(editor) => {
            editor.setColorMode("dark");
            // editor.updateInstanceState({ isGridMode: true });
          }}
        >
          <LeftSidebar />
          <BottomBar />
          <WorkspaceUI />
        </Tldraw>
      </ClientOnly>
    </div>
  );
};

export default Whiteboard;

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <Spinner className="size-10" />
      </div>
    </div>
  );
};

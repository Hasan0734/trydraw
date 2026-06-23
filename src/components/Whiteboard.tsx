import { ClientOnly } from "@tanstack/react-router";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import WorkspaceUI from "./WorkspaceUI";
import LeftSidebar from "./LeftSidebar";
// const ClientOnlyTldraw = clientOnly(() => Promise.resolve(() => <Tldraw />), {
//   fallback: <div>Loading Whiteboard...</div>,
// });

const Whiteboard = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <ClientOnly fallback={<div>Loading Whiteboard...</div>}>
        <Tldraw
          components={{
            Toolbar: null,
            MainMenu: null,
            PageMenu: null,
            HelpMenu: null,
            StylePanel: null, // Removes the default color/font panel
            ActionsMenu: null,
            MenuPanel: null,
            ZoomMenu: null,
            NavigationPanel: null,
          }}
          onMount={(editor) => {
            editor.setColorMode("dark");
          }}
        >
          <LeftSidebar />
          <WorkspaceUI />
        </Tldraw>
      </ClientOnly>
    </div>
  );
};

export default Whiteboard;

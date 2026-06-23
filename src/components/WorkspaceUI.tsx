import { useEditor, useValue } from "tldraw";

function WorkspaceUI() {
  const editor = useEditor();


  return (
    <>
      {/* LEFT SIDEBAR TOOLBAR */}


      {/* TOP CONFIGURATION / UTILITY BAR */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          gap: "16px",
          background: "#ffffff",
          padding: "8px 20px",
          borderRadius: "30px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "500", color: "#4b5563" }}>
          My Custom Board
        </span>
        <div
          style={{ width: "1px", height: "16px", backgroundColor: "#e5e7eb" }}
        />
        <button
          onClick={() => editor.zoomIn()}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ➕ Zoom In
        </button>
        <button
          onClick={() => editor.zoomOut()}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ➖ Zoom Out
        </button>
        <button
          onClick={() => editor.resetZoom()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            color: "#2563eb",
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default WorkspaceUI;

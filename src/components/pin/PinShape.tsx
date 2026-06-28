import { useCallback, useEffect, useRef } from "react";
import { useEditor, useValue } from "tldraw";

function PinShape({ shape }: any) {
  const editor = useEditor();
  const { comment, open, author, color } = shape.props;

  const isEditing = useValue(
    "editing",
    () => editor.getEditingShapeId() === shape.id,
    [editor, shape.id],
  );

  const taRef = useRef(null);
  useEffect(() => {
    if (isEditing && taRef.current) {
      taRef.current?.focus();
      taRef.current?.select();
    }
  }, [isEditing]);

  const onTextChange = useCallback(
    (e) => {
      editor.updateShape({
        id: shape.id,
        type: "pin",
        props: { comment: e.target.value },
      });
    },
    [editor, shape.id],
  );

  const onBlur = useCallback(() => {
    editor.setEditingShape(null);
  }, [editor]);

  const onPinClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (editor.getCurrentToolId() === "select") {
        editor.updateShape({
          id: shape.id,
          type: "pin",
          props: { open: !open },
        });
      }
    },
    [editor, shape.id, open],
  );

  const onClose = useCallback(
    (e) => {
      e.stopPropagation();
      editor.updateShape({
        id: shape.id,
        type: "pin",
        props: { open: false },
      });
    },
    [editor, shape.id],
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "all",
        userSelect: "none",
      }}
    >
      {/* ── Pin marker ── */}
      <div
        onClick={onPinClick}
        style={{
          position: "absolute",
          left: -14,
          top: -36,
          width: 28,
          height: 36,
          cursor: "pointer",
          filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.35))",
          zIndex: 2,
        }}
        title={open ? "Collapse comment" : "Expand comment"}
      >
        <svg
          width="28"
          height="36"
          viewBox="0 0 28 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1C8.477 1 4 5.477 4 11C4 19.5 14 35 14 35C14 35 24 19.5 24 11C24 5.477 19.523 1 14 1Z"
            fill={color}
            stroke="white"
            strokeWidth="1"
          />
          <circle cx="14" cy="11" r="5" fill="white" opacity={0.92} />
          {/* Tiny chat lines inside pin */}
          <path
            d="M11.5 9.5h5M11.5 11.5h3.5"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Comment bubble ── */}
      {open && (
        <div
          style={{
            position: "absolute",
            left: 18,
            top: -42,
            width: 196,
            background: "white",
            borderRadius: 10,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
            border: `2px solid ${color}`,
            overflow: "hidden",
            zIndex: 1,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 8px 5px",
              background: color,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                fontFamily: "system-ui, sans-serif",
                flexShrink: 0,
              }}
            >
              {author[0]?.toUpperCase()}
            </div>
            <span
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: 600,
                color: "white",
                fontFamily: "system-ui, sans-serif",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {author}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.85)",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                padding: "0 2px",
                borderRadius: 3,
                flexShrink: 0,
              }}
              title="Collapse"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "8px 10px 10px" }}>
            {isEditing ? (
              <textarea
                ref={taRef}
                value={comment}
                onChange={onTextChange}
                onBlur={onBlur}
                placeholder="Add a comment…"
                rows={3}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontSize: 12,
                  fontFamily: "system-ui, sans-serif",
                  color: "#111827",
                  lineHeight: 1.55,
                  background: "transparent",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <p
                onDoubleClick={() => editor.setEditingShape(shape.id)}
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontFamily: "system-ui, sans-serif",
                  color: comment ? "#111827" : "#9ca3af",
                  lineHeight: 1.55,
                  minHeight: 44,
                  wordBreak: "break-word",
                  cursor: "text",
                }}
                title="Double-click to edit"
              >
                {comment || "Double-click to add a comment…"}
              </p>
            )}
          </div>

          {/* Left-pointing arrow */}
          <div
            style={{
              position: "absolute",
              left: -7,
              top: 18,
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: `7px solid ${color}`,
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -4,
              top: 19,
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: `6px solid white`,
              zIndex: 4,
            }}
          />
        </div>
      )}
    </div>
  );
}



export default PinShape;
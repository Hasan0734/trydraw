import { Rectangle2d, ShapeUtil } from "tldraw";
import PinShape from './PinShape'

const PIN_COLORS = [
  "#6366f1", // indigo  (default)
  "#ec4899", // pink
  "#10b981", // emerald
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#8b5cf6", // violet
];
 

class PinShapeUtil extends ShapeUtil {
  static type = "pin";
 
  getDefaultProps() {
    return {
      comment: "",
      open: true,
      author: "You",
      color: PIN_COLORS[0],
    };
  }
 
  // Hit-test geometry — Rectangle2d is the correct tldraw v5 primitive
  getGeometry(shape) {
    const { open } = shape.props;
    return new Rectangle2d({
      x: -14,
      y: -36,
      width: open ? 230 : 28,
      height: open ? 110 : 36,
      isFilled: true,
    });
  }
 
  // Indicator outline (selection highlight) — return a Path2D or undefined
  getIndicatorPath(shape) {
    const { open } = shape.props;
    const w = open ? 230 : 28;
    const h = open ? 110 : 36;
    const x = -14;
    const y = -36;
    const r = 6;
    const p = new Path2D();
    p.roundRect(x, y, w, h, r);
    return p;
  }
 
  // Capabilities
  canResize = () => false;
  canRotate = () => false;
  canBind = () => false;
  canEdit = () => true;
  isAspectRatioLocked = () => true;
 
  // Shape is rendered as HTML (foreignObject under the hood)
  component(shape) {
    return <PinShape shape={shape}/>;
  }
 
  // Toggle open/closed on single click (select tool)
  onClick(shape) {
    this.editor.updateShape({
      id: shape.id,
      type: "pin",
      props: { open: !shape.props.open },
    });
  }
 
  // Enter text-editing mode on double-click
  onDoubleClick(shape) {
    this.editor.setEditingShape(shape.id);
  }
}
import { Shapes } from "lucide-react";
import CommonButton from "./CommonButton";
import { useEditor } from "tldraw";

const TextStyle = () => {
    const editor = useEditor()
  return (
    <div className="flex gap-1 items-center">
      <CommonButton
        onClick={() => editor.setCurrentTool("select")}
        tooltipContent="Shape"
      >
        <Shapes />
      </CommonButton>
    </div>
  );
};

export default TextStyle;

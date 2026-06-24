import { Button } from "./ui/button";
import TooltipWrapper from "./TooltipWrapper";

interface CommonButtonProps {
  active?: boolean;
  tooltipContent?: string;
  onClick: () => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

const CommonButton = ({
  active = false,
  tooltipContent="",
  onClick,
  children,
  side,
}: CommonButtonProps) => {
  return (
    <TooltipWrapper side={side} content={tooltipContent}>
      <Button
        variant={active ? "secondary" : "ghost"}
        onClick={onClick}
        size={"icon"}
      >
        {children}
      </Button>
    </TooltipWrapper>
  );
};

export default CommonButton;

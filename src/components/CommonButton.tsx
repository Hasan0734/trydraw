import { Button } from "./ui/button";
import TooltipWrapper from "./TooltipWrapper";


interface CommonButtonProps {
  active?: boolean;
  tooltipContent?: string;
  onClick?: () => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  disabled?: boolean;
  onDoubleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CommonButton = ({
  active = false,
  tooltipContent = "",
  onClick,
  onDoubleClick,
  children,
  side,
  disabled,
}: CommonButtonProps) => {
  return (
    <TooltipWrapper side={side} content={tooltipContent}>
      <Button
        variant={active ? "secondary" : "ghost"}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        size={"icon"}
        disabled={disabled}
      >
        {children}
      </Button>
    </TooltipWrapper>
  );
};

export default CommonButton;

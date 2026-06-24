import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface TooltipWrapperProps {
  content: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

const TooltipWrapper = ({
  content,
  children,
  side = "top",
}: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;

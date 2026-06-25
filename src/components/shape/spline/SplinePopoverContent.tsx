import CommonButton from "#/components/CommonButton";
import { PopoverContent } from "#/components/ui/popover";

const SplinePopoverContent = () => {
  return (
    <PopoverContent className="w-fit grid grid-cols-2 p-1" sideOffset={10}>
      <CommonButton tooltipContent="Spline ─ Line">
        <span
          className="bg-foreground size-4 "
          style={{
            mask: `url(/assets/merged.svg#spline-line) center 100% / 100% no-repeat`,
          }}
        ></span>
      </CommonButton>
      <CommonButton tooltipContent="Spline ─ Cubic">
        <span
          className="bg-foreground size-4 "
          style={{
            mask: `url(/assets/merged.svg#spline-cubic) center 100% / 100% no-repeat`,
          }}
        ></span>
      </CommonButton>
    </PopoverContent>
  );
};

export default SplinePopoverContent;

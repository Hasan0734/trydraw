import React from "react";
import CommonButton from "../CommonButton";

const fills = [
  {
    title: "None",
    value: "fill-none",
  },
  {
    title: "Semi",
    value: "fill-semi",
  },
  {
    title: "Solid",
    value: "fill-solid",
  },
  {
    title: "Pattern",
    value: "fill-pattern",
  },
];

const ShapeFill = () => {
  return (
    
      <div className="grid grid-cols-4 gap-1">
        {fills.map((fill) => (
          <CommonButton
            key={fill.value}
            tooltipContent={`Fill ─ ${fill.title}`}
          >
            <div
              className="bg-white size-4 "
              style={{
                mask: `url(/assets/merged.svg#${fill.value}) center 100% / 100% no-repeat`,
              }}
            ></div>
          </CommonButton>
        ))}
      </div>
    
  );
};

export default ShapeFill;

import React from "react";
import CommonButton from "../CommonButton";

const sizes = [
  {
    title: "Small",
    value: "size-small",
  },
  {
    title: "Medium",
    value: "size-medium",
  },
  {
    title: "Large",
    value: "size-large",
  },
  {
    title: "Extra large",
    value: "size-extra-large",
  },
];

const ShapeOutlineSize = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {sizes.map((size) => (
        <CommonButton
          key={size.value}
          tooltipContent={`Size ─ ${size.title}`}
        >
          <div
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#${size.value}) center 100% / 100% no-repeat`,
            }}
          ></div>
        </CommonButton>
      ))}
    </div>
  );
};

export default ShapeOutlineSize;

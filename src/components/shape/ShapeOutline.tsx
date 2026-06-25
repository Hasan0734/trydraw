import React from "react";
import CommonButton from "../CommonButton";

const outlines = [
  {
    title: "Draw",
    value: "dash-draw",
  },
  {
    title: "Dashed",
    value: "dash-dashed",
  },
  {
    title: "Dotted",
    value: "dash-dotted",
  },
  {
    title: "Solid",
    value: "dash-solid",
  },
];

const ShapeOutline = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {outlines.map((outline) => (
        <CommonButton
          key={outline.value}
          tooltipContent={`Dash ─ ${outline.title}`}
        >
          <div
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#${outline.value}) center 100% / 100% no-repeat`,
            }}
          ></div>
        </CommonButton>
      ))}
    </div>
  );
};

export default ShapeOutline;

import React from "react";
import CommonButton from "../CommonButton";

const fonts = [
  {
    title: "Draw",
    value: "font-draw",
  },
  {
    title: "Sans",
    value: "font-sans",
  },
  {
    title: "Serif",
    value: "font-serif",
  },
  {
    title: "Mono",
    value: "font-mono",
  },
];

const ShapeFonts = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {fonts.map((font) => (
        <CommonButton
          key={font.value}
          tooltipContent={`Font ─ ${font.title}`}
        >
          <div
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#${font.value}) center 100% / 100% no-repeat`,
            }}
          ></div>
        </CommonButton>
      ))}
    </div>
  );
};

export default ShapeFonts;

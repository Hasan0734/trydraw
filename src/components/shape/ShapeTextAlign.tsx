import CommonButton from "../CommonButton";

const aligns = [
  {
    title: "Label ─ Start",
    value: "horizontal-align-start",
  },
  {
    title: "Label ─ Middle",
    value: "horizontal-align-middle",
  },
  {
    title: "Label ─ End",
    value: "horizontal-align-end",
  },
  {
    title: "Vertical align ─ Middle",
    value: "vertical-align-middle",
  },
];

const ShapeTextAlign = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {aligns.map((align) => (
        <CommonButton
          key={align.value}
          tooltipContent={`${align.title}`}
        >
          <div
            className="bg-white size-4 "
            style={{
              mask: `url(/assets/merged.svg#${align.value}) center 100% / 100% no-repeat`,
            }}
          ></div>
        </CommonButton>
      ))}
    </div>
  );
};

export default ShapeTextAlign;

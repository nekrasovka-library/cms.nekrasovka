// editor.constants.js
export const FONT_SIZE_ARRAY = [
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "30px",
  "32px",
  "34px",
  "36px",
  "38px",
  "40px",
  "42px",
  "46px",
  "52px",
  "62px",
  "72px",
  "82px",
  "92px",
  "102px",
];

export const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: FONT_SIZE_ARRAY }],
  [{ color: [] }, { font: [] }], // dropdowns
  [{ align: [] }],
];

import React from "react";
import Preview from "../Preview/preview.jsx";
import Constructor from "../Constructor/constructor.jsx";
import { useSelector } from "react-redux";

const Page = () => {
  const { isPreview } = useSelector((state) => state.preview);

  return isPreview ? <Preview /> : <Constructor />;
};

export default Page;

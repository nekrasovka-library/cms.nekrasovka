import Menu from "./containers/Menu/menu.jsx";
import Main from "./containers/Main/main.jsx";
import React, { useEffect } from "react";
import Settings from "./containers/Settings/settings.jsx";
import ConstructorHeader from "./containers/ConstructorHeader/constructor.header.jsx";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { isPreview } = useSelector((state) => state.preview);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_FONTS_REQUEST" });
  }, []);

  return (
    <>
      {!isPreview && <ConstructorHeader />}
      <Main />
      {!isPreview && (
        <>
          <Menu />
          <Settings />
        </>
      )}
    </>
  );
}

export default App;

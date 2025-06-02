import Menu from "./containers/Menu/menu.jsx";
import Main from "./containers/Main/main.jsx";
import React from "react";
import Settings from "./containers/Settings/settings.jsx";
import Header from "./containers/Header/header.jsx";
import { useSelector } from "react-redux";

function App() {
  const { isPreview } = useSelector((state) => state.preview);

  return (
    <>
      <Header />
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

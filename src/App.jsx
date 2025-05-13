import Menu from "./containers/Menu/menu.jsx";
import Main from "./containers/Main/main.jsx";
import React from "react";
import Settings from "./containers/Settings/settings.jsx";
import Header from "./containers/Header/header.jsx";

function App() {
  return (
    <>
      <Menu />
      <Settings />
      <Header />
      <Main />
    </>
  );
}

export default App;

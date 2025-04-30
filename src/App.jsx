import Menu from "./containers/Menu/menu.jsx";
import Main from "./containers/Main/main.jsx";
import Modal from "./nekrasovka-ui/Modal/modal.jsx";
import React from "react";
import { useSelector } from "react-redux";
import Settings from "./containers/Settings/settings.jsx";

function App() {
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSettingsOpen } = useSelector((state) => state.settings);

  return (
    <>
      <Modal isModal={isMenuOpen || isSettingsOpen} />
      <Menu />
      <Settings />
      <Main />
    </>
  );
}

export default App;

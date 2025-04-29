import Menu from "./containers/Menu/menu.jsx";
import Main from "./containers/Main/main.jsx";
import Modal from "./nekrasovka-ui/Modal/modal.jsx";
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const { isMenuOpen } = useSelector((state) => state.menu);

  return (
    <>
      <Modal isModal={isMenuOpen} />
      <Menu />
      <Main />
    </>
  );
}

export default App;

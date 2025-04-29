import React from "react";
import { Container } from "./modal.styles.js";

const Modal = ({ isModal }) => {
  return <Container $isModal={isModal} />;
};

export default Modal;

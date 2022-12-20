import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onReReRemove} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.context}>{props.children}</div>
    </div>
  );
};
const Overlayys = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onReReRemove={props.onReRemove} />,
        Overlayys
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        Overlayys
      )}
    </Fragment>
  );
};

export default Modal;

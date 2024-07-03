import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = (props) => {
  const { isOpen, close, children, parentClasses } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (typeof window !== "object") return null;

  if (isOpen) {
    return createPortal(
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-40 ${parentClasses}`}
        onClick={close ? close : null}
      >
        {children}
      </div>,
      document.getElementById("modal")
    );
  } else {
    return null;
  }
};

export default Modal;

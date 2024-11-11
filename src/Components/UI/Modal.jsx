import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgressContext from "../../store/UserProgressContext";

export default function Modal({ children, open, className = "" ,onclose}) {
  const dialog = useRef();

  const userProgressCtx = useContext(UserProgressContext)

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onclose}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}

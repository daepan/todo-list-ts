import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "ts/Portal";
import styled from "styled-components";


const ModalWrapper = styled.div`
z-index: 9999;
width: 100vw;
height: 100vh;
position: absolute;
top: 0;
background: rgba(0, 0, 0, 0.7);
display: flex;
justify-content: center;
align-items: center;

&enter-done {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

&exit {
  opacity: 0;
  transform: scale(0.4);
}
`

const ModalContent = styled.div`
display: block;
background: white;
width: 70%;
height: 70%;
padding: 1rem;
border-radius: 1rem;
`
type Listener = (this: HTMLElement, ev: KeyboardEvent) => any;

const useOnEscapeClick = (callback: () => void) => {
  useEffect(() => {
    const closeOnEscapeKey: Listener = (e) =>
      e.key === "Escape" ? callback() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [callback]);
};

function Modal({
  children,
  isOpen,
  handleClose
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}) {
  useOnEscapeClick(handleClose);
  const nodeRef = useRef(null);
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalWrapper ref={nodeRef}>
          <button onClick={() => handleClose()}>
            Close
          </button>
          <ModalContent>{children}</ModalContent>
        </ModalWrapper>
      </CSSTransition>
    </ReactPortal>
  );
}

export default Modal;

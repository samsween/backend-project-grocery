import React, { ReactElement } from "react";

type ModalProps = {
  children: ReactElement;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  );
};

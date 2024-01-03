import React, { useState } from "react";

const Modal = ({
  children,
  show = false,
}: {
  children: React.ReactNode;
  show: boolean;
}): JSX.Element => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded shadow-lg">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;

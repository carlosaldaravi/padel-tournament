"use client";
import React, { useState } from "react";
import HeaderModal from "./header-modal";
import FooterModal from "./footer-modal";

export default function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative w-full rounded-t-xl">
      <div className="w-full space-x-2">
        {/* <!-- Button trigger modal--> */}
        <div>
          <button
            type="button"
            className="w-full bg-gray-600 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={() => setShowModal(true)}
          >
            Editar partido
          </button>
        </div>
      </div>

      {showModal && (
        <>
          {/* Black background */}
          <div
            className="fixed inset-0 bg-black opacity-70 z-10"
            onClick={() => setShowModal(false)}
          ></div>
          {/* Modal */}
          <div className="fixed flex flex-col inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-2/3 bg-gray-600 rounded-xl z-20">
            <HeaderModal title={title} onClose={() => setShowModal(false)} />
            <div className="flex-grow p-4">{children}</div>
            <FooterModal onClose={() => setShowModal(false)} />
          </div>
        </>
      )}
    </div>
  );
}

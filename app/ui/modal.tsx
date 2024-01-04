"use client";
import React, { useState } from "react";
import { MatchType } from "../lib/definitions";

export default function Modal({ match }: { match?: MatchType }): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative">
      <div className="w-full space-x-2">
        {/* <!-- Button trigger modal--> */}
        <div>
          <button
            type="button"
            className="w-full inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
          <div className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-[50vw] h-2/3 bg-gray-600 rounded-xl z-20">
            <div className="flex justify-between items-center">
              {match?.id}
              <button
                type="button"
                className="box-content z-10 cursor-pointer rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div>
              <button
                type="button"
                className="inline-block z-10 rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

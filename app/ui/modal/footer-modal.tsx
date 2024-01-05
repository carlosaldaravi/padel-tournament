"use client";

import { SubmitButton } from "../submit-button";

interface FooterModalProps {
  onClose: () => void;
}

export default function FooterModal({
  onClose,
}: FooterModalProps): JSX.Element {
  return (
    <div className="p-4 flex justify-end items-center">
      <button
        type="button"
        className="inline-block z-10 rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
        onClick={() => onClose()}
      >
        Cerrar
      </button>
    </div>
  );
}

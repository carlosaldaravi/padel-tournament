"use client";

import SVG from "../svg";

interface HeaderModalProps {
  title: string;
  onClose: () => void;
}

export default function HeaderModal({
  title,
  onClose,
}: HeaderModalProps): JSX.Element {
  return (
    <div className="flex p-4 justify-between items-center border-b">
      <span>{title}</span>
      <button
        type="button"
        className="box-content z-10 cursor-pointer rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
        onClick={() => onClose()}
        aria-label="Close"
      >
        <SVG type="close" size="6" />
      </button>
    </div>
  );
}

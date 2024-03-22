"use client";
import React, { useEffect, useRef, ReactElement } from "react";

type ModalProps = {
  children: ReactElement;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Modal = ({ open, setOpen, children }: ModalProps) => {
  const containeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containeRef.current &&
        !containeRef?.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, {
      capture: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, {
        capture: true,
      });
    };
  }, [containeRef, setOpen]);
  return (
    <>
      {open && (
        <div className="w-full h-screen absolute top-0 left-0  bg-black bg-opacity-40 flex items-center justify-center">
          <div
            className="w-full md:w-3/4 lg:w-1/2 min-h-1/2 bg-white rounded-lg shadow-lg m-auto h-fit"
            ref={containeRef}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

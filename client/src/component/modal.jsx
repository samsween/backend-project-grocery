"use client";
import { useEffect, useRef } from "react";

export const Modal = ({ open, setOpen, children }) => {
  const containeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containeRef.current && !containeRef.current.contains(e.target)) {
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

import React from "react";

export default function ToastPortal(){
  return (
    <div className="toast-live-region fixed bottom-4 left-4 w-[1px] h-[1px] overflow-hidden">
      <div
        aria-live="polite"
        role="status"
        className="sr-only"
        id="toast-live-polite"
      />
      <div
        aria-live="assertive"
        role="alert"
        className="sr-only"
        id="toast-live-assertive"
      />
    </div>
  );
}

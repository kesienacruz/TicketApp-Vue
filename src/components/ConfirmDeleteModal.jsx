import React, { useEffect, useRef, useState, useCallback } from "react";
import useEscapeKey from "../hooks/useEscapeKey.js";
import { toast } from "react-toastify";
import { MSG_DELETE_ERROR } from "../utils/constants.js";

export default function ConfirmDeleteModal({
  ticketTitle,
  onConfirm,
  onCancel,
}) {
  const panelRef = useRef(null);
  const confirmRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  useEscapeKey(() => {
    if (!submitting) onCancel();
  });

  useEffect(() => {
    function handleFocus(e) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) {
        confirmRef.current?.focus();
      }
    }
    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const result = await onConfirm();
      if (!result || result.ok !== true) {
        throw new Error("Delete failed");
      }
      onCancel();
    } catch {
      toast.error(MSG_DELETE_ERROR, { role: "alert" });
      const assertiveNode = document.getElementById("toast-live-assertive");
      if (assertiveNode) assertiveNode.textContent = MSG_DELETE_ERROR;
    } finally {
      setSubmitting(false);
    }
  }, [onConfirm, onCancel, submitting]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        id="confirm-delete-panel"
        ref={panelRef}
        className="card w-full max-w-sm p-6 space-y-6 bg-surface"
      >
        <div className="space-y-2">
          <h2
            id="confirm-delete-title"
            className="text-display-md font-semibold text-text"
          >
            Delete ticket?
          </h2>
          <p className="text-body-sm text-text-dim">
            “{ticketTitle}” will be permanently removed.
          </p>
          <p
            className="text-body-xs text-text-dim text-[12px] leading-[16px]"
            aria-live="assertive"
            role="alert"
          >
            This action cannot be undone.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            ref={confirmRef}
            disabled={submitting}
            onClick={handleConfirm}
            className={`rounded-pill px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-500 ${
              submitting
                ? "bg-danger-text/70 text-white cursor-not-allowed"
                : "bg-danger-text text-white hover:opacity-90"
            }`}
          >
            {submitting ? "Deleting..." : "Confirm delete"}
          </button>

          <button
            disabled={submitting}
            onClick={onCancel}
            className={`rounded-pill bg-surface px-4 py-2 text-sm font-medium text-text border border-surface-border hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500 ${
              submitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

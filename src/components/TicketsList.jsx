import React from "react";
import TicketCard from "./TicketCard.jsx";

export default function TicketsList({
  tickets,
  loading,
  loadError,
  onRetry,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="text-body-sm text-text-dim">
        Loading tickets…
      </div>
    );
  }

  if (loadError) {
    const assertiveNode =
      typeof document !== "undefined"
        ? document.getElementById("toast-live-assertive")
        : null;
    if (assertiveNode) {
      assertiveNode.textContent = loadError;
    }

    return (
      <div className="space-y-3">
        <div
          className="rounded-card border border-danger-border bg-danger-bg px-3 py-2 text-danger-text text-body-sm"
          role="alert"
          aria-live="assertive"
        >
          {loadError}
        </div>

        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-body-sm text-text-dim">
        No tickets yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tickets.map((t) => (
        <TicketCard
          key={t.id}
          ticket={t}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

import React from "react";
import TicketStatusBadge from "./TicketStatusBadge.jsx";

function formatDateShort(iso){
  if(!iso) return "–";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
}

export default function TicketCard({ ticket, onView, onEdit, onDelete }) {
  const { title, description, status, createdAt } = ticket;

  return (
    <article
      className="card p-4 flex flex-col gap-4 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
      tabIndex={0}
      aria-label={`Ticket: ${title}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-body-md font-semibold text-text break-words">
            {title || "Untitled ticket"}
          </h2>
          <p className="text-body-xs text-text-dim text-[12px] leading-[16px]">
            Created {formatDateShort(createdAt)}
          </p>
        </div>
        <TicketStatusBadge status={status}/>
      </div>

      <p className="text-body-sm text-text-dim max-h-[3.75rem] overflow-hidden text-ellipsis break-words">
        {description || "No description provided."}
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={()=>onView(ticket)}
          className="rounded-pill border border-surface-border bg-surface px-3 py-1.5 text-[13px] leading-[16px] font-medium text-text hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          aria-label={`View ticket ${title}`}
          title="View"
        >
          View
        </button>
        <button
          onClick={()=>onEdit(ticket)}
          className="rounded-pill bg-brand-600 px-3 py-1.5 text-[13px] leading-[16px] font-medium text-white hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          aria-label={`Edit ticket ${title}`}
          title="Edit"
        >
          Edit
        </button>
        <button
          onClick={()=>onDelete(ticket)}
          className="rounded-pill bg-danger-text px-3 py-1.5 text-[13px] leading-[16px] font-medium text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          aria-label={`Delete ticket ${title}`}
          title="Delete"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

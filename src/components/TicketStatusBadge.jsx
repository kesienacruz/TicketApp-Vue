import React from "react";

export default function TicketStatusBadge({ status }) {
  let classes = "bg-gray-400 text-white";
  if (status === "open") classes = "bg-green-600 text-white";
  else if (status === "in_progress") classes = "bg-amber-500 text-white";
  else if (status === "closed") classes = "bg-gray-400 text-white";

  return (
    <span
      className={`inline-flex items-center rounded-pill px-2 py-1 text-[12px] leading-[16px] font-medium ${classes}`}
    >
      {status}
    </span>
  );
}

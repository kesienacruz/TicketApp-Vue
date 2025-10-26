import React from "react";
import Header from "./Header.jsx";

export default function LayoutShell({children}){
  return (
    <div className="min-h-screen flex flex-col bg-surface-subtle text-text">
      <Header />
      <main className="flex-1 page-shell py-6">{children}</main>
      <footer className="border-t border-surface-border bg-surface py-4 text-center text-body-xs text-text-dim">
        <div className="page-shell">
          © 2025 TicketApp — All rights reserved.
        </div>
      </footer>
    </div>
  );
}

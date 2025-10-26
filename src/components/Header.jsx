import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header(){
  const { user, logoutUser } = useAuth();

  return (
    <header className="h-header flex items-center bg-surface border-b border-surface-border">
      <div className="page-shell flex items-center justify-between w-full">
        <Link
          to="/dashboard"
          className="text-text font-semibold text-base focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
        >
          TicketApp
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/tickets"
            className="text-text-dim hover:text-text focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
          >
            Tickets
          </Link>

          {user?.email ? (
            <>
              <span className="text-text-dim">{user.email}</span>
              <button
                onClick={logoutUser}
                className="rounded-pill bg-surface px-3 py-1 text-xs font-medium text-text border border-surface-border hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="text-text-dim hover:text-text focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

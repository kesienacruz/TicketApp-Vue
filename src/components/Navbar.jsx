// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav
      className="
        bg-surface
        border-b border-surface-border
        h-header
        flex items-center
      "
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="page-shell flex items-center justify-between w-full">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="
            flex items-center gap-2
            focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm
          "
        >
          {/* Logo circle */}
          <div
            className="
              h-8 w-8 flex items-center justify-center
              rounded-card bg-brand-600 text-white text-[14px]
              font-semibold leading-none shadow-card
            "
            aria-hidden="true"
          >
            T
          </div>
          <span className="text-text text-base font-semibold leading-none">
            TicketApp
          </span>
        </Link>

        {/* Right-side actions */}
        <div className="flex items-center gap-4 text-sm">
          {/* Only show nav links for authenticated users */}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="
                  text-text-dim hover:text-text
                  focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm
                "
              >
                Dashboard
              </Link>

              <Link
                to="/tickets"
                className="
                  text-text-dim hover:text-text
                  focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm
                "
              >
                Tickets
              </Link>

              <span className="hidden sm:inline text-text-dim">
                {user.email}
              </span>

              <button
                onClick={logoutUser}
                className="
                  rounded-pill
                  bg-surface
                  px-3 py-1
                  text-xs font-medium text-text
                  border border-surface-border
                  hover:bg-surface-subtle
                  focus-visible:ring-2
                  focus-visible:ring-brand-500
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="
                  text-text-dim hover:text-text
                  focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm
                "
              >
                Login
              </Link>

              <Link
                to="/auth/signup"
                className="
                  rounded-pill
                  bg-brand-600
                  px-4 py-2
                  text-white text-xs font-medium
                  hover:bg-brand-700
                  focus-visible:ring-2
                  focus-visible:ring-brand-500
                "
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


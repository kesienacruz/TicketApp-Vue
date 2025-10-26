// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { isValidationError, isAuthError } from "../utils/errors.js";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors: rhfErrors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const [serverError, setServerError] = useState(null);

  async function onSubmit(values) {
    setServerError(null);
    const result = await loginUser({
      email: values.email.trim(),
      password: values.password,
    });

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    navigate("/dashboard");
  }

  function fieldServerError(name) {
    if (serverError?.details?.fields?.[name]) {
      return serverError.details.fields[name];
    }
    return null;
  }

  const topLevelMessage =
    serverError &&
    (isAuthError(serverError) || isValidationError(serverError))
      ? serverError.message
      : null;

  return (
    <main className="min-h-screen flex flex-col bg-surface-subtle text-text">
      {/* Navbar on login page */}
      <Navbar />

      <div className="flex-1 flex items-center justify-center page-shell py-16">
        <div className="card w-full max-w-sm p-6 space-y-6">
          <div>
            <h1 className="text-display-md text-text font-semibold">
              Log in
            </h1>
            <p className="text-body-sm text-text-dim">
              Use your email and password.
            </p>
          </div>

          {topLevelMessage ? (
            <div
              className="
                rounded-card
                border border-danger-border
                bg-danger-bg
                px-3 py-2
                text-danger-text text-body-sm
              "
              role="alert"
              aria-live="assertive"
            >
              {topLevelMessage}
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-2">
              <label
                className="block text-body-sm font-medium text-text"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="
                  w-full
                  rounded-card
                  border border-surface-border
                  bg-surface
                  px-3 py-2
                  text-body-md text-text
                  focus-visible:ring-brand-500
                "
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required." })}
              />
              <p className="text-body-sm text-danger-text" role="alert">
                {rhfErrors.email?.message || fieldServerError("email")}
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                className="block text-body-sm font-medium text-text"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="
                  w-full
                  rounded-card
                  border border-surface-border
                  bg-surface
                  px-3 py-2
                  text-body-md text-text
                  focus-visible:ring-brand-500
                "
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required.",
                })}
              />
              <p className="text-body-sm text-danger-text" role="alert">
                {rhfErrors.password?.message ||
                  fieldServerError("password")}
              </p>
            </div>

            <button
              type="submit"
              className="
                w-full
                rounded-pill
                bg-brand-600
                px-4 py-2
                text-white text-sm font-medium
                hover:bg-brand-700
                focus-visible:ring-2
                focus-visible:ring-brand-500
              "
            >
              Sign in
            </button>
          </form>

          <div className="text-center text-body-sm text-text-dim">
            No account?{" "}
            <Link
              className="
                text-brand-600 hover:text-brand-700 font-medium
                focus-visible:ring-2 focus-visible:ring-brand-500
                rounded-sm
              "
              to="/auth/signup"
            >
              Create one
            </Link>
          </div>

          <div className="text-center text-body-xs text-text-dim text-[12px] leading-[16px]">
            Test login: test@ticketapp.test / password123
          </div>
        </div>
      </div>

      <footer className="border-t border-surface-border bg-surface py-4 text-center text-body-xs text-text-dim">
        <div className="page-shell">
          © 2025 TicketApp — All rights reserved.
        </div>
      </footer>
    </main>
  );
}

"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-sm tracking-[0.3em] uppercase text-muted">
            LIORA STUDIO
          </h1>
          <p className="mt-2 text-xs text-muted/60">Admin Access</p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-[11px] uppercase tracking-[0.2em] text-muted mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-border/70 bg-surface/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent/60 focus:outline-none"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] uppercase tracking-[0.2em] text-muted mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-border/70 bg-surface/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent/60 focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-foreground py-3.5 text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

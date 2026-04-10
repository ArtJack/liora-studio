"use client";

import { useActionState, useRef, useEffect } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
              htmlFor="code"
              className="block text-[11px] uppercase tracking-[0.2em] text-muted mb-2 text-center"
            >
              Enter 6-digit code from Google Authenticator
            </label>
            <input
              ref={inputRef}
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoComplete="one-time-code"
              className="w-full rounded-xl border border-border/70 bg-surface/50 px-4 py-4 text-center text-2xl tracking-[0.5em] font-light text-foreground placeholder:text-muted/30 focus:border-accent/60 focus:outline-none"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-foreground py-3.5 text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    setError("");
    setNotice("");
    const address = email.trim();
    if (!address) {
      setError("Enter your email above, then tap “Forgot password?” again.");
      return;
    }
    setResetting(true);
    try {
      await resetPassword(address);
      setNotice(
        `If ${address} has an admin account, a reset link is on its way. Check your inbox and spam folder.`,
      );
    } catch (err) {
      setError(
        err?.code === "auth/invalid-email"
          ? "That email address is not valid."
          : err?.code === "auth/too-many-requests"
            ? "Too many attempts. Wait a few minutes and try again."
            : "Could not send the reset email. Check your connection and try again.",
      );
    } finally {
      setResetting(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text px-6">
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-8 w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold">Admin Login</h1>

        <div className="space-y-1">
          <label className="text-sm text-muted" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-surface border border-border px-3 py-2 outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-surface border border-border px-3 py-2 outline-none focus:border-accent"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="text-sm text-accent">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent text-on-accent font-medium py-2 disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={resetting}
          className="w-full py-2 text-sm text-muted underline underline-offset-4 hover:text-accent disabled:opacity-60"
        >
          {resetting ? "Sending reset email…" : "Forgot password?"}
        </button>
      </form>
    </div>
  );
}

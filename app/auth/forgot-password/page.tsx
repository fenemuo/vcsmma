import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — VCSMMA",
  description: "Reset your password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <p className="mt-2 text-slate-400">Enter your email address to receive password reset instructions.</p>

        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <p className="font-medium">Password Reset Feature</p>
          <p className="mt-2">
            To reset your password, please contact the administrator or use your GitHub account to log in instead.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="/auth/login"
            className="flex-1 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-center text-white transition hover:bg-slate-800"
          >
            Back to Login
          </a>
          <a
            href="/auth/register"
            className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-center text-white transition hover:bg-emerald-500"
          >
            Create Account
          </a>
        </div>
      </section>
    </main>
  );
}

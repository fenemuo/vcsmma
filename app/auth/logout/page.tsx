"use client";

import { signOut } from "next-auth/react";

export default function LogoutPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-3xl font-semibold">Signed Out</h1>
        <p className="mt-2 text-slate-400">You have been signed out of your account.</p>
        <button
          className="mt-6 rounded-2xl bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-500"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Continue
        </button>
      </section>
    </main>
  );
}

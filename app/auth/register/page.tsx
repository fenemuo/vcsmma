"use client";

import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (value: string) => {
    return /^[A-Za-z0-9]{6,}$/.test(value);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters and contain letters and numbers only.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data?.message || "Registration failed.");
      return;
    }

    setSuccess("Account created successfully. You can now log in.");
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <p className="mt-2 text-slate-400">Register with a username, email, and password.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-300">Username</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300">Full Name</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 text-xs text-slate-500">Password must be at least 6 characters and contain only letters and numbers.</p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-emerald-400">{success}</p>}

          <button className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-500" type="submit">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account? <a href="/auth/login" className="text-blue-400 hover:underline">Log in here</a>.
        </p>
      </section>
    </main>
  );
}

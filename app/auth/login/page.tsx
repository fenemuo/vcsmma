"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FiGithub } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(searchParams.get("error") || "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (result?.error) {
      setError("Invalid username or password.");
      return;
    }

    router.push("/profile");
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="mt-2 text-slate-400">Access the platform with your credentials or GitHub account.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-300">Username</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white transition hover:bg-emerald-500" type="submit">
            Login
          </button>
        </form>

        {/* GitHub Login */}
        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-950 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signIn("github", { redirect: true, callbackUrl: "/profile" })}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <FiGithub size={20} />
            Login with GitHub
          </button>
        </div>

        <div className="mt-6 space-y-2 text-sm text-slate-400">
          <p>
            Don&apos;t have an account? <a href="/auth/register" className="text-emerald-400 hover:underline">Create one here</a>.
          </p>
          <p>
            <a href="/auth/forgot-password" className="text-emerald-400 hover:underline">Forgot your password?</a>
          </p>
        </div>
      </section>
    </main>
  );
}

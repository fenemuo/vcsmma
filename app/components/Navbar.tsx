"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "./Logo";
import { useSession } from "next-auth/react";

const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Simulators", href: "/simulators" },
  { title: "Learn", href: "/learn" },
  { title: "Quiz", href: "/quiz" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const authLinks = session.status === "authenticated" ? [
    { title: "Profile", href: "/profile" },
    { title: "Logout", href: "/auth/logout" },
  ] : [
    { title: "Login", href: "/auth/login" },
    { title: "Register", href: "/auth/register" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-2xl shadow-slate-950/30 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-full border border-slate-800/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white hover:shadow-lg"
            >
              {item.title}
            </Link>
          ))}
          {authLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-full border border-slate-800/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white hover:shadow-lg"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/simulator"
            className="hidden rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:bg-indigo-500 lg:inline-flex"
          >
            Launch Lab
          </Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-200 transition hover:border-slate-500 hover:text-white lg:hidden"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800/70 bg-slate-950/98 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-4 pt-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-slate-800/75 bg-slate-900/95 px-4 py-3 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {authLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-slate-800/75 bg-slate-900/95 px-4 py-3 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/simulator"
              className="rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:bg-indigo-500"
              onClick={() => setIsOpen(false)}
            >
              Launch Lab
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

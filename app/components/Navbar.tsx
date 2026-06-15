"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "./Logo";

const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Simulators", href: "/simulators" },
  { title: "Learn", href: "/learn" },
  { title: "Quiz", href: "/quiz" },
  { title: "Profile", href: "/profile" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-slate-800 hover:text-white"
            >
              {item.title}
            </Link>
          ))}
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
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pb-4 pt-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

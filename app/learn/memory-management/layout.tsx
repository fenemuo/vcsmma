//create a layout and include a responsive navbar that can can one back to the home page of memory management and include the children prop to render the content of the page and the first-fit, best-fit and worst-fit algorithms in the navbar and also include a footer component

import Link from "next/link";

export default function MemoryManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">

        <header className="bg-slate-950 border-b border-slate-800/70">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/learn/memory-management" className="text-lg font-bold text-white">
                    Memory Management
                </Link>
                <nav className="hidden gap-4 lg:flex">
                    <Link href="/learn/memory-management/first-fit" className="rounded-full border border-slate-800/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white">
                        First Fit 
                    </Link>
                    <Link href="/learn/memory-management/best-fit" className="rounded-full border border-slate-800/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white">
                        Best Fit
                    </Link>
                    <Link href="/learn/memory-management/worst-fit" className="rounded-full border border-slate-800/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white">
                        Worst Fit
                    </Link>
                </nav>
            </div>
        </header>

        <main className="flex-grow bg-slate-950">
            {children}
        </main>

    </div>
  );
}






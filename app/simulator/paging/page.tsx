"use client";

import { useState } from "react";
import { PagingSidebar, type PagingModule } from "@/app/components/simulator/paging/PagingSidebar";
import { AddressTranslation } from "@/app/components/simulator/paging/AddressTranslation";
import { PageTableSize } from "@/app/components/simulator/paging/PageTableSize";
import { TlbAccessTime } from "@/app/components/simulator/paging/TlbAccessTime";
import { PageReplacement } from "@/app/components/simulator/paging/PageReplacement";

export default function PagingSimulatorPage() {
  const [module, setModule] = useState<PagingModule>("translation");

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-6 text-xl font-semibold text-slate-900">Simulators — Paging</h1>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <PagingSidebar module={module} onSelect={setModule} />

        <section className="min-w-0 space-y-6 rounded-2xl border bg-slate-900 p-6 text-slate-100">
          {module === "translation" && <AddressTranslation />}
          {module === "table-size" && <PageTableSize />}
          {module === "tlb" && <TlbAccessTime />}
          {module === "replacement" && <PageReplacement />}
        </section>
      </div>
    </main>
  );
}

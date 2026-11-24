import { Suspense } from "react";
import type { Metadata } from "next";
import Explorer from "@/components/Explorer";
export const metadata: Metadata = { title: "Explore issues" };
export default function Page() {
  return (<><h1 className="text-2xl font-semibold">Explore issues</h1>
    <Suspense fallback={<p className="mt-6 text-muted">Loading filters…</p>}><Explorer /></Suspense></>);
}

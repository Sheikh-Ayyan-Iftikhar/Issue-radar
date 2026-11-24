"use client";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";
import { useSaved } from "@/lib/saved";
export default function Saved() {
  const { saved } = useSaved();
  return (<><title>Saved issues · FirstIssue Radar</title><h1 className="text-2xl font-semibold">Saved issues</h1>
    <p className="mt-1 text-sm text-muted">Stored in this browser only. Details reflect when you saved them; open GitHub for the current state.</p>
    {saved.length === 0 ? <div className="mt-6 rounded-lg border border-line bg-surface p-6"><p className="font-medium">Nothing saved yet.</p><p className="mt-1 text-sm text-muted">Use the bookmark on any issue, or <Link className="text-accent hover:underline" href="/explore?labels=good-first-issue">browse good first issues</Link>.</p></div>
      : <ul className="mt-6 space-y-3">{saved.map((i) => <IssueCard key={i.id} issue={i} />)}</ul>}</>);
}

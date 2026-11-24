"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LANGUAGES, type SearchResponse } from "@/lib/types";
import IssueCard from "./IssueCard";

const cache = new Map<string, SearchResponse>();
const LABELS = [["good-first-issue", "Good first issue"], ["help-wanted", "Help wanted"], ["beginner", "Beginner labels"]];
const field = "h-11 w-full rounded-md border border-line bg-surface px-3 placeholder:text-muted";

export default function Explorer() {
  const sp = useSearchParams(), router = useRouter(), path = usePathname();
  const qs = sp.toString();
  const [res, setRes] = useState<{ key: string; error?: string; data?: SearchResponse }>({ key: "" });
  const [tick, setTick] = useState(0);
  const labels = (sp.get("labels") ?? "").split(",").filter(Boolean);
  const cached = cache.get(qs);
  const current = res.key === qs ? res : undefined;
  const data = cached ?? current?.data;
  const error = cached ? undefined : current?.error;
  const loading = !cached && !current;

  useEffect(() => {
    if (cache.has(qs)) return;
    const ac = new AbortController();
    fetch(`/api/issues?${qs}`, { signal: ac.signal })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? "Something went wrong.");
        cache.set(qs, j); setRes({ key: qs, data: j });
      })
      .catch((e) => { if (e.name !== "AbortError") setRes({ key: qs, error: e.message }); });
    return () => ac.abort();
  }, [qs, tick]);

  function update(next: Record<string, string>, resetPage = true) {
    const p = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(next)) { if (v) p.set(k, v); else p.delete(k); }
    if (resetPage) p.delete("page");
    router.push(`${path}?${p.toString()}`, { scroll: false });
  }
  const toggleLabel = (k: string) => update({ labels: (labels.includes(k) ? labels.filter((l) => l !== k) : [...labels, k]).join(",") });
  const page = Number(sp.get("page")) || 1;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr]">
      <form key={qs} onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); update(Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v).trim()]))); }} className="space-y-4 md:sticky md:top-20 md:self-start" aria-label="Filters">
        {([["q", "Keywords", "docs, typo, bug…"], ["repo", "Repository or owner", "vercel/next.js or vercel"], ["label", "Other label", "e.g. documentation"]] as const).map(([n, l, ph]) => (
          <div key={n}><label htmlFor={n} className="mb-1 block text-sm text-muted">{l}</label><input id={n} name={n} defaultValue={sp.get(n) ?? ""} placeholder={ph} className={field} /></div>))}
        <div><label htmlFor="language" className="mb-1 block text-sm text-muted">Language</label>
          <select id="language" name="language" defaultValue={sp.get("language") ?? ""} className={field}><option value="">Any language</option>{LANGUAGES.map((l) => <option key={l}>{l}</option>)}</select></div>
        {([["created", "Opened", [["", "Any time"], ["7", "Last 7 days"], ["30", "Last 30 days"], ["90", "Last 90 days"]]], ["active", "Repository activity", [["", "Any"], ["7", "Updated this week"], ["30", "Updated this month"]]], ["sort", "Sort by", [["updated", "Recently updated"], ["created", "Newest"], ["comments", "Most comments"]]]] as const).map(([n, l, opts]) => (
          <div key={n}><label htmlFor={n} className="mb-1 block text-sm text-muted">{l}</label>
            <select id={n} name={n} defaultValue={sp.get(n) ?? opts[0][0]} className={field}>{opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></div>))}
        <button className="h-11 w-full cursor-pointer rounded-md bg-accent font-medium text-bg hover:opacity-90">Apply filters</button>
        <button type="button" onClick={() => router.push(path)} className="h-11 w-full cursor-pointer rounded-md border border-line text-sm text-muted hover:text-fg">Reset</button>
      </form>
      <section aria-live="polite" aria-busy={loading}>
        <fieldset className="mb-4 flex flex-wrap gap-2"><legend className="sr-only">Label presets</legend>
          {LABELS.map(([k, t]) => (<button key={k} type="button" aria-pressed={labels.includes(k)} onClick={() => toggleLabel(k)}
            className={`min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors ${labels.includes(k) ? "border-accent bg-surface-2 text-fg" : "border-line text-muted hover:text-fg"}`}>{t}</button>))}
        </fieldset>
        {error && <div role="alert" className="rounded-lg border border-line bg-surface p-4 text-sm"><p>{error}</p><button onClick={() => { cache.delete(qs); setRes({ key: "" }); setTick((t) => t + 1); }} className="mt-3 cursor-pointer text-accent hover:underline">Try again</button></div>}
        {loading && !error && <ul className="space-y-3" aria-label="Loading issues">{[0, 1, 2, 3].map((i) => <li key={i} className="h-28 animate-pulse rounded-lg border border-line bg-surface" />)}</ul>}
        {!loading && !error && data && (data.issues.length === 0
          ? <div className="rounded-lg border border-line bg-surface p-6"><p className="font-medium">No open, unassigned issues match.</p><p className="mt-1 text-sm text-muted">Try fewer filters, a broader keyword, or switch label presets. Not every repo uses the same labels.</p></div>
          : <>
            <p className="mb-3 text-sm text-muted">{data.total.toLocaleString()} open issues{data.total > 1000 && " (GitHub shows the first 1,000)"}. Language filter uses the repository&apos;s primary language.</p>
            <ul className="space-y-3">{data.issues.map((i) => <IssueCard key={i.id} issue={i} language={sp.get("language") ?? undefined} />)}</ul>
            <div className="mt-6 flex items-center justify-between text-sm">
              <button disabled={page <= 1} onClick={() => update({ page: String(page - 1) }, false)} className="min-h-11 cursor-pointer rounded-md border border-line px-4 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              <span className="text-muted">Page {page}</span>
              <button disabled={!data.hasMore} onClick={() => update({ page: String(page + 1) }, false)} className="min-h-11 cursor-pointer rounded-md border border-line px-4 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
            </div></>)}
      </section>
    </div>
  );
}

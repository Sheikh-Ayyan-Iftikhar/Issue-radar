import Link from "next/link";
import { Search } from "lucide-react";
import { LANGUAGES } from "@/lib/types";

const categories = [
  ["Good first issue", "labels=good-first-issue", "Maintainers tagged these for newcomers."],
  ["Help wanted", "labels=help-wanted", "Open to outside contributors."],
  ["Beginner & first-timers", "labels=beginner", "Beginner, starter and first-timers-only labels."],
];
const steps = [
  ["Search", "Pick a language and keywords. Queries go straight to GitHub's issue search."],
  ["Read", "Check labels, activity and comment count. Open the issue on GitHub for the full context."],
  ["Save & contribute", "Bookmark candidates locally, then follow the repo's CONTRIBUTING guide."],
];
export default function Home() {
  return (
    <div className="space-y-20">
      <section className="max-w-2xl pt-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Your Next Open-Source Contribution Starts Here.</h1>
        <p className="mt-4 text-lg text-muted">Discover real GitHub issues that match your skills, explore active projects, and make your first meaningful open-source contribution.</p>
        <form action="/explore" className="mt-8 flex flex-col gap-2 sm:flex-row" role="search">
          <label htmlFor="q" className="sr-only">Search issues</label>
          <div className="relative flex-1"><Search aria-hidden className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input id="q" name="q" placeholder="Keywords, e.g. docs, typo, accessibility" className="h-11 w-full rounded-md border border-line bg-surface pl-9 pr-3 placeholder:text-muted" /></div>
          <label htmlFor="language" className="sr-only">Language</label>
          <select id="language" name="language" defaultValue="" className="h-11 rounded-md border border-line bg-surface px-3">
            <option value="">Any language</option>{LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>
          <input type="hidden" name="labels" value="good-first-issue" />
          <button className="h-11 cursor-pointer rounded-md bg-accent px-5 font-medium text-bg transition-opacity hover:opacity-90">Find My First Issue</button>
        </form>
      </section>
      <section aria-labelledby="cats"><h2 id="cats" className="text-sm font-medium uppercase tracking-wide text-muted">Browse by label</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">{categories.map(([t, q, d]) => (
          <li key={t}><Link href={`/explore?${q}`} className="block h-full rounded-lg border border-line bg-surface p-4 transition-colors hover:bg-surface-2"><h3 className="font-medium">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></Link></li>))}
        </ul>
        <p className="mt-3 text-sm text-muted">Label conventions vary between repositories. We only call an issue beginner-friendly when its labels say so.</p>
      </section>
      <section aria-labelledby="how"><h2 id="how" className="text-sm font-medium uppercase tracking-wide text-muted">How it works</h2>
        <ol className="mt-4 grid gap-6 sm:grid-cols-3">{steps.map(([t, d], i) => (
          <li key={t}><span className="font-mono text-sm text-accent">0{i + 1}</span><h3 className="mt-1 font-medium">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li>))}
        </ol>
      </section>
    </div>
  );
}

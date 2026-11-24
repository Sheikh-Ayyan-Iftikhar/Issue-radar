import type { Metadata } from "next";
export const metadata: Metadata = { title: "Docs" };
const code = "rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm";
export default function Docs() {
  return (<article className="max-w-2xl space-y-6 text-muted"><h1 className="text-2xl font-semibold text-fg">Documentation</h1>
    <section><h2 className="mb-1 font-medium text-fg">Using the app</h2><p>Open Explore, choose a language and label preset, and optionally narrow by keywords, repository, age or activity. Filters live in the URL, so any search can be shared. Bookmark issues to keep them on the Saved page.</p></section>
    <section><h2 className="mb-1 font-medium text-fg">How filtering works</h2><p>Searches use <code className={code}>is:issue is:open no:assignee archived:false</code> plus your filters. Language uses GitHub&apos;s <code className={code}>language:</code> qualifier, which matches the repository&apos;s primary language. Label presets match several common label names at once.</p></section>
    <section><h2 className="mb-1 font-medium text-fg">Running locally</h2><p><code className={code}>npm install</code>, copy <code className={code}>.env.example</code> to <code className={code}>.env.local</code>, then <code className={code}>npm run dev</code>. A token is optional and only raises GitHub&apos;s rate limits; it stays on the server.</p></section></article>);
}

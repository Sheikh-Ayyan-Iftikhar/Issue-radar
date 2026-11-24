import { NextRequest, NextResponse } from "next/server";
import type { Issue, SearchResponse } from "@/lib/types";

const PER_PAGE = 20;
const LABEL_SETS: Record<string, string[]> = {
  "good-first-issue": ["good first issue", "good-first-issue"],
  "help-wanted": ["help wanted"],
  beginner: ["beginner", "beginner-friendly", "first-timers-only", "starter", "newcomer"],
};
const day = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
const clean = (s: string) => s.replace(/["\\]/g, "").trim();

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const parts = ["is:issue", "is:open", "archived:false", "no:assignee"];
  const q = clean(p.get("q") ?? "");
  if (q) parts.unshift(q);
  const repo = clean(p.get("repo") ?? "");
  if (repo) parts.push(repo.includes("/") ? `repo:${repo}` : `user:${repo}`);
  const lang = clean(p.get("language") ?? "");
  if (lang) parts.push(`language:"${lang}"`);
  const labels = (p.get("labels") ?? "").split(",").flatMap((k) => LABEL_SETS[k] ?? []);
  const custom = clean(p.get("label") ?? "");
  if (custom) labels.push(custom);
  if (labels.length) parts.push(`label:${labels.map((l) => `"${l}"`).join(",")}`);
  const created = Number(p.get("created")), active = Number(p.get("active"));
  if (created > 0) parts.push(`created:>=${day(created)}`);
  if (active > 0) parts.push(`updated:>=${day(active)}`);
  const sort = ["created", "updated", "comments"].includes(p.get("sort") ?? "") ? p.get("sort")! : "updated";
  const page = Math.max(1, Math.min(34, Number(p.get("page")) || 1));

  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(parts.join(" "))}&sort=${sort}&order=desc&per_page=${PER_PAGE}&page=${page}`;
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "firstissue-radar" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let res: Response;
  try { res = await fetch(url, { headers, next: { revalidate: 300 } }); }
  catch { return NextResponse.json({ error: "Could not reach GitHub. Check your connection and try again." }, { status: 502 }); }

  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (res.status === 429 || (res.status === 403 && remaining === "0")) {
      const reset = Number(res.headers.get("x-ratelimit-reset")) * 1000;
      const wait = reset ? Math.max(1, Math.ceil((reset - Date.now()) / 1000)) : 60;
      return NextResponse.json({ error: `GitHub rate limit reached. Try again in about ${wait}s, or add a GITHUB_TOKEN.` }, { status: 429 });
    }
    if (res.status === 422) return NextResponse.json({ error: "GitHub could not parse that search. Try simpler keywords." }, { status: 422 });
    return NextResponse.json({ error: `GitHub returned an error (${res.status}).` }, { status: 502 });
  }

  const data = await res.json();
  const issues: Issue[] = (data.items ?? []).map((i: any) => {
    const [owner, name] = String(i.repository_url).split("/").slice(-2);
    return {
      id: i.id, number: i.number, title: i.title, url: i.html_url,
      repo: `${owner}/${name}`, owner,
      labels: (i.labels ?? []).map((l: any) => ({ name: l.name, color: l.color })),
      createdAt: i.created_at, updatedAt: i.updated_at, comments: i.comments,
    };
  });
  const body: SearchResponse = { issues, total: data.total_count ?? 0, page, hasMore: page * PER_PAGE < Math.min(data.total_count ?? 0, 1000) };
  return NextResponse.json(body);
}

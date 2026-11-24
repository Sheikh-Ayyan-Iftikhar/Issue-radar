"use client";
import { Bookmark, BookmarkCheck, ExternalLink, MessageSquare } from "lucide-react";
import { isBeginner, type Issue } from "@/lib/types";
import { useSaved } from "@/lib/saved";
import { ago } from "@/lib/format";

export default function IssueCard({ issue, language }: { issue: Issue; language?: string }) {
  const { isSaved, toggle } = useSaved();
  const on = isSaved(issue.id);
  return (
    <li className="rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-muted">{issue.owner} / <span className="text-fg">{issue.repo.split("/")[1]}</span>{language && <span> · {language}</span>}</p>
          <h3 className="mt-1 break-words font-medium leading-snug">{issue.title}</h3>
        </div>
        <button onClick={() => toggle(issue)} aria-pressed={on} aria-label={on ? "Remove from saved issues" : "Save issue"} className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded text-muted transition-colors hover:bg-surface-2 hover:text-fg">
          {on ? <BookmarkCheck aria-hidden className="size-5 text-accent" /> : <Bookmark aria-hidden className="size-5" />}
        </button>
      </div>
      {issue.labels.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {issue.labels.slice(0, 6).map((l) => (
            <li key={l.name} className="inline-flex items-center gap-1.5 rounded border border-line bg-surface-2 px-2 py-0.5 text-xs text-muted">
              <span aria-hidden className="size-2 rounded-full" style={{ background: `#${l.color}` }} />{l.name}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {isBeginner(issue) && <span className="font-medium text-success">Beginner-friendly label</span>}
          <span>Opened <time dateTime={issue.createdAt}>{ago(issue.createdAt)}</time></span>
          <span>Updated <time dateTime={issue.updatedAt}>{ago(issue.updatedAt)}</time></span>
          <span className="inline-flex items-center gap-1"><MessageSquare aria-hidden className="size-3.5" />{issue.comments}<span className="sr-only"> comments</span></span>
        </p>
        <a href={issue.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-medium text-accent hover:underline">
          View Issue on GitHub <ExternalLink aria-hidden className="size-3.5" />
        </a>
      </div>
    </li>
  );
}

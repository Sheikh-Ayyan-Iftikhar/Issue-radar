"use client";
import { useSyncExternalStore, useCallback } from "react";
import type { Issue } from "./types";
const KEY = "firstissue-radar:saved";
const EMPTY: Issue[] = [];
let cache: { raw: string | null; val: Issue[] } = { raw: null, val: EMPTY };
function read(): Issue[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.val;
    cache = { raw, val: raw ? (JSON.parse(raw) as Issue[]) : EMPTY };
    return cache.val;
  } catch { return EMPTY; }
}
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
function subscribe(f: () => void) {
  subs.add(f); window.addEventListener("storage", f);
  return () => { subs.delete(f); window.removeEventListener("storage", f); };
}
export function useSaved() {
  const saved = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((issue: Issue) => {
    const cur = read();
    const next = cur.some((i) => i.id === issue.id) ? cur.filter((i) => i.id !== issue.id) : [issue, ...cur];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    emit();
  }, []);
  return { saved, toggle, isSaved: (id: number) => saved.some((i) => i.id === id) };
}

export type Label = { name: string; color: string };
export type Issue = {
  id: number; number: number; title: string; url: string;
  repo: string; owner: string; labels: Label[];
  createdAt: string; updatedAt: string; comments: number;
};
export type SearchResponse = { issues: Issue[]; total: number; page: number; hasMore: boolean };
export const LANGUAGES = ["JavaScript","TypeScript","Python","Java","C++","C","Go","Rust","PHP","Ruby","HTML","CSS"] as const;
export const BEGINNER_RE = /good[ -]first|beginner|first[ -]timer|starter|newcomer|easy/i;
export const isBeginner = (i: Issue) => i.labels.some((l) => BEGINNER_RE.test(l.name));

import type { Metadata } from "next";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (<article className="max-w-2xl space-y-4"><h1 className="text-2xl font-semibold">About</h1>
    <p className="text-muted">FirstIssue Radar helps developers find real, open GitHub issues they can start on. Every result comes live from GitHub&apos;s issue search API. Nothing is mocked or pre-seeded.</p>
    <p className="text-muted">Labels are the only signal used to call an issue beginner-friendly, and repositories label inconsistently, so treat the indicator as a hint and read the issue before committing.</p>
    <p className="text-muted">The project is MIT licensed. Contributions are welcome.</p></article>);
}

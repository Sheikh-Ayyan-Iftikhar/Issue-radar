import Link from "next/link";
import { Radar } from "lucide-react";
const links = [["Explore", "/explore"], ["Saved", "/saved"], ["Docs", "/docs"], ["About", "/about"]];
export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold"><Radar aria-hidden className="size-5 text-accent" />FirstIssue Radar</Link>
        <ul className="flex items-center gap-1 text-sm">
          {links.map(([n, h]) => (
            <li key={h}><Link href={h} className="inline-flex min-h-11 items-center rounded px-2.5 text-muted transition-colors hover:text-fg sm:px-3">{n}</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

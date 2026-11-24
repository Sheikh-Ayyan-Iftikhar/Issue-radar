import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: { default: "FirstIssue Radar — find your first open-source issue", template: "%s · FirstIssue Radar" },
  description: "Discover real GitHub issues that match your skills and make your first open-source contribution.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded focus:bg-surface focus:px-3 focus:py-2">Skip to content</a>
      <Header />
      <main id="main" className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <footer className="border-t border-line py-8 text-sm text-muted"><div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-4">
        <span>MIT licensed · data from the GitHub REST API</span>
        <span className="flex gap-4"><a className="hover:text-fg" href="https://github.com/your-username/firstissue-radar">GitHub repository</a><a className="hover:text-fg" href="/docs">Documentation</a></span>
      </div></footer>
    </body></html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/results", label: "Results" },
  { href: "/calc-gpa", label: "Calc GPA" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Calculatea Your CGPA — home">
          <Logo markClassName="h-8 w-8" wordmarkClassName="hidden lg:block" />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4",
                  active
                    ? "bg-ink text-white"
                    : "text-ink-soft hover:bg-ash hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
        <Logo markClassName="h-6 w-6" />
        <p className="max-w-md text-sm text-ink-soft">
          Calculate Your CGPA — a student friendly GPA / CGPA calculator built
          for all Insttitute.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/how-it-works" className="hover:underline">
            How it works
          </Link>
          <Link href="/results" className="hover:underline">
            Results
          </Link>
          <Link href="/calc-gpa" className="hover:underline">
            Calc GPA
          </Link>
          <Link href="/result-links" className="hover:underline">
            Result links
          </Link>
        </div>
        <p className="text-xs text-neutral-400">
          Not affiliated with this site. Always cross-check with your official
          results.
        </p>
      </div>
    </footer>
  );
}

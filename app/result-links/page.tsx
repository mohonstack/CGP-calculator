import { RESULT_LINKS, RESULT_PORTAL_URL, ROMAN_YEARS } from "@/lib/data";
import { RocketIcon } from "@/components/RocketIcon";
import { LogoWatermark } from "@/components/Logo";

export const metadata = {
  title: "Result Links — Calculatea Your CGPA",
  description:
    "Direct links to the JNTUH regular and supplementary examination results for every year and semester.",
};

export default function ResultLinksPage() {
  return (
    <div className="relative overflow-hidden">
      <LogoWatermark className="pointer-events-none absolute -left-12 top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 lg:block" />

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="logo-word text-3xl sm:text-4xl">Result Links</h1>
          <p className="mt-3 text-sm text-ink-soft">
            JNTUH official examination result pages, grouped by year.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-8">
          {RESULT_LINKS.map((group) => (
            <section key={group.year}>
              <h2 className="logo-word border-b border-line pb-2 text-lg">
                {ROMAN_YEARS[group.year]} Year
              </h2>
              <ul className="mt-3 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href={RESULT_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2.5 py-1 text-sm leading-snug transition hover:text-accent"
                    >
                      <RocketIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink transition group-hover:text-accent" />
                      <span className="group-hover:underline">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-neutral-400">
          Links open the official JNTUH results portal in a new tab.
        </p>
      </section>
    </div>
  );
}

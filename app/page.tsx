import Link from "next/link";
import { Logo, LogoMark } from "@/components/Logo";
import { Illustration } from "@/components/Illustration";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-130 bg-[radial-gradient(60%_60%_at_50%_0%,#f3f4f6_0%,rgba(255,255,255,0)_75%)]"
      />

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          <Logo stacked />

          <p className="mt-7 max-w-xl text-balance text-xl font-semibold leading-snug text-ink sm:text-2xl">
            Checkout Your CGPA
            <span className="block font-normal text-ink-soft">
             For all Institute students
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/calc-gpa"
              className="rounded-full border-2 border-ink bg-ink px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-transparent hover:text-ink"
            >
              Get Started
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-full border-2 border-ink bg-white px-7 py-2.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              How it Works?
            </Link>
          </div>

          <div className="mt-12 w-full max-w-3xl">
            <Illustration className="mx-auto h-auto w-full" />
          </div>
        </div>
      </section>

      {/* feature strip */}
      <section className="border-y border-line bg-ash">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "4.00 point scale",
              body: "Grades follow the standard numerical-marks scale — A+ is 80% and above for 4.00 points, right down to F for zero.",
            },
            {
              title: "Instant SGPA & CGPA",
              body: "Every grade is converted to grade points, multiplied by credits and totalled the way the university does it.",
            },
            {
              title: "Saved on this device",
              body: "Your entries are stored locally in the browser, so the results page always shows your latest numbers.",
            },
          ].map((item) => (
            <div key={item.title}>
              <LogoMark className="h-7 w-7 text-ink" strokeWidth={8} />
              <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* quick links */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="logo-word text-3xl sm:text-4xl">Shortcuts</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/calc-gpa", label: "Calculate semester GPA", hint: "Enter subject wise grades" },
            { href: "/results", label: "View your CGPA", hint: "Semester wise breakdown" },
            { href: "/result-links", label: "Result links", hint: "Official JNTUH result pages" },
            { href: "/how-it-works", label: "How it works", hint: "Formula explained" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-line p-5 transition hover:border-ink hover:bg-ash"
            >
              <p className="font-semibold group-hover:underline">
                {link.label}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{link.hint}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

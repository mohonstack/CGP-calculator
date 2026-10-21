import Link from "next/link";
import { LogoWatermark } from "@/components/Logo";
import { GRADES } from "@/lib/grades";

export const metadata = {
  title: "How it works — Calculatea Your CGPA",
  description:
    "How the JNTUH grade point scale, SGPA and CGPA are calculated — explained in four simple steps.",
};

const STEPS = [
  {
    title: "Choose your year and semester",
    body: "Pick the semester you want to calculate — the subject list and credits load automatically and every field stays editable.",
  },
  {
    title: "Enter the grade you received",
    body: "Pick the letter grade from the dropdown next to every subject — A+, A, A-, B+, B, B-, C+ and below, on a 4.00 point scale.",
  },
  {
    title: "Read your SGPA",
    body: "Grade points × credits are totalled and divided by the total credits of the semester to get your SGPA.",
  },
  {
    title: "Check the cumulative CGPA",
    body: "Add every semester you have completed and the Results page gives you the weighted cumulative CGPA.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative overflow-hidden">
      <LogoWatermark className="pointer-events-none absolute -left-12 top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 lg:block" />

      <section className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="logo-word text-3xl sm:text-4xl">How it Works?</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Four steps from a marksheet to your CGPA.
          </p>
        </div>

        <ol className="mt-12 space-y-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-xl border border-line p-5"
            >
              <span className="logo-word flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-base text-white">
                {index + 1}
              </span>
              <div>
                <h2 className="font-semibold">{step.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* ---------- formula ---------- */}
        <section className="mt-14 rounded-xl border border-line bg-ash p-6">
          <h2 className="logo-word text-xl">The formula</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <p className="rounded-lg bg-white p-4 text-center font-medium text-ink">
              SGPA = Σ (Grade Points × Credits) ÷ Σ Credits
            </p>
            <p className="rounded-lg bg-white p-4 text-center font-medium text-ink">
              CGPA = Σ (SGPA × Semester Credits) ÷ Σ Semester Credits
            </p>
          </div>

          <h3 className="mt-6 font-semibold">Grading scale</h3>
          <div className="slim-scroll mt-3 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse rounded-lg bg-white text-sm">
              <thead>
                <tr className="bg-ink text-[11px] uppercase tracking-wider text-white">
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Numerical marks
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Letter grade
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Grade point
                  </th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map((g) => (
                  <tr key={g.key} className="even:bg-ash/50">
                    <td className="border-t border-line px-4 py-2">{g.range}</td>
                    <td className="border-t border-line px-4 py-2 font-semibold">
                      {g.label}
                    </td>
                    <td className="border-t border-line px-4 py-2 tabular-nums">
                      {g.points.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 font-semibold">How the CGPA is graded</h3>
          <div className="slim-scroll mt-3 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse rounded-lg bg-white text-sm">
              <thead>
                <tr className="bg-ink text-[11px] uppercase tracking-wider text-white">
                  <th className="px-4 py-2.5 text-left font-semibold">
                    CGPA range
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Classification
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["3.50 – 4.00", "First Class with Distinction"],
                  ["3.00 – 3.49", "First Class"],
                  ["2.50 – 2.99", "Second Class"],
                  ["2.00 – 2.49", "Pass"],
                  ["Below 2.00", "Fail"],
                ].map(([range, label]) => (
                  <tr key={range} className="even:bg-ash/50">
                    <td className="border-t border-line px-4 py-2 tabular-nums">
                      {range}
                    </td>
                    <td className="border-t border-line px-4 py-2">{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-10 flex justify-center">
          <Link
            href="/calc-gpa"
            className="rounded-full border-2 border-ink bg-ink px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-transparent hover:text-ink"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

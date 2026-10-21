import { CgpaSummary } from "@/components/CgpaSummary";
import { LogoWatermark } from "@/components/Logo";

export const metadata = {
  title: "Results — Calculatea Your CGPA",
  description:
    "Your semester wise GPA breakdown and cumulative CGPA for JNTUH affiliated colleges.",
};

export default function ResultsPage() {
  return (
    <div className="relative overflow-hidden">
      <LogoWatermark className="pointer-events-none absolute -left-12 top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 lg:block" />

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="logo-word text-3xl sm:text-4xl">Results</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Semester wise GPA and your cumulative CGPA.
          </p>
        </div>

        <div className="mt-12">
          <CgpaSummary />
        </div>
      </section>
    </div>
  );
}

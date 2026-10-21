import { Calculator } from "@/components/Calculator";
import { LogoWatermark } from "@/components/Logo";

export const metadata = {
  title: "Calc GPA — Calculatea Your CGPA",
  description:
    "Choose your year and semester, then enter your subject grades to get your SGPA instantly.",
};

export default function CalcGpaPage() {
  return (
    <div className="relative overflow-hidden">
      <LogoWatermark className="pointer-events-none absolute -left-12 top-1/2 hidden h-85 w-85 -translate-y-1/2 lg:block" />

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h1 className="logo-word text-3xl sm:text-4xl">Calc GPA</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Pick your year and semester, fill in the grades and press calculate.
          </p>
        </div>

        <div className="mt-10">
          <Calculator />
        </div>
      </section>
    </div>
  );
}

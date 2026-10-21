"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ROMAN_YEARS, SEMESTERS, semesterOrdinal } from "@/lib/data";
import { computeCgpa, computeResult, classification, round } from "@/lib/calc";
import { clearResults, useStoredResults } from "@/lib/store";
import { LogoMark } from "@/components/Logo";

export function CgpaSummary() {
  const results = useStoredResults();

  const rows = useMemo(() => {
    return SEMESTERS.map((semester) => {
      const stored = results.find((r) => r.semesterId === semester.id);
      if (!stored) {
        return { semester, sgpa: null as number | null, credits: 0 };
      }
      const computation = computeResult(stored);
      return {
        semester,
        sgpa: computation.earnedCredits > 0 ? round(computation.sgpa) : null,
        credits: computation.earnedCredits,
      };
    });
  }, [results]);

  const cgpa = useMemo(() => round(computeCgpa(results)), [results]);
  const hasResults = results.length > 0;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-12">
        {[1, 2, 3, 4].map((year) => (
          <section key={year} className="text-center">
            <h2 className="logo-word text-xl sm:text-2xl">
              {ROMAN_YEARS[year]} YEAR
            </h2>

            <div className="mx-auto mt-4 grid max-w-2xl gap-x-6 gap-y-3 sm:grid-cols-3">
              {rows
                .filter((row) => row.semester.year === year)
                .map((row) => (
                  <div
                    key={row.semester.id}
                    className="flex items-baseline justify-center gap-2 text-sm sm:text-base"
                  >
                    <span className="font-medium">
                      {semesterOrdinal(row.semester.semester)} Semester GPA
                    </span>
                    <span
                      className={
                        row.sgpa === null
                          ? "text-neutral-300"
                          : "font-semibold tabular-nums"
                      }
                    >
                      {row.sgpa === null ? "—" : row.sgpa.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* ---------- cumulative CGPA ---------- */}
      <div className="mt-12 border-t border-line pt-8 text-center">
        <p className="text-base font-medium sm:text-lg">
          Cumulative Grade Point Average (CGPA)
        </p>
        <p
          className={
            hasResults
              ? "logo-word mt-2 text-5xl tabular-nums sm:text-6xl"
              : "mt-2 text-5xl font-light tabular-nums text-neutral-200 sm:text-6xl"
          }
        >
          {hasResults ? cgpa.toFixed(2) : "—"}
        </p>
        {hasResults && (
          <p className="mt-2 text-sm text-ink-soft">
            {classification(cgpa)} · based on {results.length} semester
            {results.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="no-print mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/calc-gpa"
          className="rounded-full border-2 border-ink bg-ink px-7 py-2 text-sm font-semibold text-white transition hover:bg-transparent hover:text-ink"
        >
          Add a semester
        </Link>
        {hasResults && (
          <button
            type="button"
            onClick={() => {
              clearResults();
              window.location.reload();
            }}
            className="rounded-full border-2 border-ink bg-white px-7 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
          >
            Clear all
          </button>
        )}
      </div>

      {!hasResults && (
        <div className="mt-12 flex flex-col items-center text-center">
          <LogoMark className="h-10 w-10 text-neutral-200" strokeWidth={6} />
          <p className="mt-4 text-sm text-ink-soft">
            No semesters calculated yet. Head over to{" "}
            <Link href="/calc-gpa" className="font-medium underline">
              Calc GPA
            </Link>{" "}
            to enter your grades.
          </p>
        </div>
      )}
    </div>
  );
}

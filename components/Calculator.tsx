"use client";

import { useMemo, useState } from "react";
import { GRADES, pointsFor, type GradeKey } from "@/lib/grades";
import { SEMESTERS, defaultSheet, getSemester, romanSemester, type SheetRow } from "@/lib/data";
import { computeSheet, round } from "@/lib/calc";
import { saveResult, useStoredResults } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Calculator() {
  const stored = useStoredResults();

  const [semesterId, setSemesterId] = useState(SEMESTERS[0].id);
  const [sheet, setSheet] = useState<SheetRow[]>(() =>
    defaultSheet(SEMESTERS[0]),
  );
  const [submitted, setSubmitted] = useState(true);
  const [sgpa, setSgpa] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  /** Unsaved edits per semester, so switching tabs never loses work. */
  const [drafts, setDrafts] = useState<Record<string, SheetRow[]>>({});

  const semester = useMemo(
    () => getSemester(semesterId) ?? SEMESTERS[0],
    [semesterId],
  );

  const computation = useMemo(() => computeSheet(sheet), [sheet]);

  /* ------------------------------ sheet helpers ------------------------------ */

  function loadSheet(id: string): SheetRow[] {
    if (drafts[id]) return drafts[id];

    const saved = stored.find((r) => r.semesterId === id);
    if (saved) {
      return saved.subjects.map((s) => ({
        code: s.code,
        name: s.name,
        credits: s.credits,
        grade: s.grade,
      }));
    }
    const target = getSemester(id);
    return target ? defaultSheet(target) : [];
  }

  function updateRow(index: number, patch: Partial<SheetRow>) {
    const next = sheet.map((row, i) => (i === index ? { ...row, ...patch } : row));
    setSheet(next);
    setDrafts((d) => ({ ...d, [semesterId]: next }));
  }

  function handleSubmit() {
    setSheet(loadSheet(semesterId));
    setSubmitted(true);
    setSgpa(null);
    setMessage(null);
  }

  function handleCalculate() {
    if (computation.missing > 0) {
      setMessage(
        `${computation.missing} subject${computation.missing > 1 ? "s are" : " is"} still without a grade. The SGPA below is calculated from the graded subjects only.`,
      );
    } else {
      setMessage(null);
    }

    setSgpa(round(computation.points / Math.max(computation.earnedCredits, 0)));

    saveResult({
      semesterId: semester.id,
      subjects: sheet.map((row) => ({
        code: row.code,
        name: row.name,
        credits: Number.isFinite(row.credits) ? row.credits : 0,
        grade: row.grade,
      })),
    });
  }

  function handleReset() {
    const fresh = defaultSheet(semester);
    setSheet(fresh);
    setDrafts((d) => ({ ...d, [semester.id]: fresh }));
    setSgpa(null);
    setMessage(null);
  }

  function addSubject() {
    const next = [
      ...sheet,
      {
        code: `CUSTOM${sheet.length + 1}`,
        name: "New Subject",
        credits: 3,
      },
    ];
    setSheet(next);
    setDrafts((d) => ({ ...d, [semesterId]: next }));
  }

  function removeSubject(index: number) {
    const next = sheet.filter((_, i) => i !== index);
    setSheet(next);
    setDrafts((d) => ({ ...d, [semesterId]: next }));
  }

  /* --------------------------------- render --------------------------------- */

  return (
    <div className="mx-auto max-w-4xl">
      {/* ---------- controls ---------- */}
      <div className="no-print flex flex-wrap items-center justify-center gap-3">
        <label className="sr-only" htmlFor="semester">
          Year and semester
        </label>
        <select
          id="semester"
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
        >
          {SEMESTERS.map((sem) => (
            <option key={sem.id} value={sem.id}>
              Year {sem.year} &amp; Sem {romanSemester(sem.semester)}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg border border-neutral-300 bg-white px-5 py-2 text-sm font-medium transition hover:border-ink hover:bg-ash"
        >
          Submit
        </button>
      </div>

      {/* ---------- subject table ---------- */}
      {submitted && (
        <>
          <h2 className="mt-10 text-center text-base font-semibold">
            {semester.label}
          </h2>
          <p className="mt-1 text-center text-xs text-neutral-400">
            Subject name, credits and grade are all editable.
          </p>

          <div className="slim-scroll mt-4 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-155 border-collapse text-sm">
              <thead>
                <tr className="bg-ash text-[11px] uppercase tracking-wider text-ink-soft">
                  <th className="border-b border-line px-4 py-3 text-left font-semibold">
                    Subject Name
                  </th>
                  <th className="border-b border-l border-line px-4 py-3 text-center font-semibold">
                    Credits
                  </th>
                  <th className="border-b border-l border-line px-4 py-3 text-center font-semibold">
                    Grade
                  </th>
                  <th className="border-b border-l border-line px-4 py-3 text-center font-semibold">
                    Grade Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {sheet.map((row, index) => {
                  const points = pointsFor(row.grade, row.credits);

                  return (
                    <tr key={`${row.code}-${index}`} className="odd:bg-white even:bg-ash/40">
                      {/* --- editable subject name --- */}
                      <td className="border-b border-line px-4 py-2">
                        <div className="flex items-center gap-2">
                          <input
                            aria-label={`Subject name for row ${index + 1}`}
                            value={row.name}
                            onChange={(e) =>
                              updateRow(index, { name: e.target.value })
                            }
                            className="w-full min-w-0 rounded-md border border-transparent bg-transparent px-2 py-1 font-medium uppercase leading-snug outline-none transition hover:border-neutral-300 focus:border-ink focus:bg-white"
                          />
                          <button
                            type="button"
                            aria-label={`Remove ${row.name}`}
                            onClick={() => removeSubject(index)}
                            className="shrink-0 rounded-md px-1.5 py-1 text-neutral-200 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6l12 12M18 6 6 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <input
                          aria-label={`Subject code for row ${index + 1}`}
                          value={row.code}
                          onChange={(e) =>
                            updateRow(index, { code: e.target.value })
                          }
                          className="ml-2 mt-0.5 w-40 rounded border border-transparent bg-transparent px-2 py-0.5 text-[11px] text-neutral-400 outline-none transition hover:border-neutral-300 focus:border-ink focus:bg-white"
                        />
                      </td>

                      {/* --- editable credits --- */}
                      <td className="border-b border-l border-line px-4 py-2">
                        <input
                          aria-label={`Credits for ${row.name}`}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step={0.5}
                          value={row.credits}
                          onChange={(e) =>
                            updateRow(index, {
                              credits: e.target.value === "" ? 0 : Number(e.target.value),
                            })
                          }
                          className="w-20 rounded-md border border-transparent bg-transparent px-2 py-1 text-center tabular-nums outline-none transition hover:border-neutral-300 focus:border-ink focus:bg-white"
                        />
                      </td>

                      {/* --- editable grade --- */}
                      <td className="border-b border-l border-line px-4 py-2">
                        <select
                          aria-label={`Grade for ${row.name}`}
                          value={row.grade ?? ""}
                          onChange={(e) =>
                            updateRow(index, {
                              grade: (e.target.value || undefined) as
                                | GradeKey
                                | undefined,
                            })
                          }
                          className={cn(
                            "w-full rounded-md border px-2 py-1 text-center text-sm outline-none transition focus:ring-2 focus:ring-ink/10",
                            row.grade
                              ? "border-neutral-300 bg-white font-semibold"
                              : "border-dashed border-neutral-300 bg-white text-neutral-400",
                          )}
                        >
                          <option value="">—</option>
                          {GRADES.map((g) => (
                            <option key={g.key} value={g.key}>
                              {g.label} ({g.points.toFixed(2)})
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border-b border-l border-line px-4 py-2 text-center tabular-nums">
                        {row.grade ? points : "—"}
                      </td>
                    </tr>
                  );
                })}

                <tr className="bg-ash font-semibold">
                  <td className="px-4 py-3">TOTAL</td>
                  <td className="border-l border-line px-4 py-3 text-center tabular-nums">
                    {computation.credits}
                  </td>
                  <td className="border-l border-line px-4 py-3 text-center">
                    —
                  </td>
                  <td className="border-l border-line px-4 py-3 text-center tabular-nums">
                    {computation.points}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ---------- grading scale legend ---------- */}
          <details className="no-print mx-auto mt-6 max-w-2xl rounded-lg border border-line bg-ash/50 px-4 py-3">
            <summary className="cursor-pointer text-center text-sm font-medium">
              Grading scale
            </summary>
            <div className="slim-scroll mt-3 overflow-x-auto">
              <table className="w-full min-w-95 border-collapse bg-white text-xs">
                <thead>
                  <tr className="bg-ink text-[10px] uppercase tracking-wider text-white">
                    <th className="px-3 py-2 text-left font-semibold">
                      Numerical marks
                    </th>
                    <th className="px-3 py-2 text-left font-semibold">
                      Letter grade
                    </th>
                    <th className="px-3 py-2 text-left font-semibold">
                      Grade point
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GRADES.map((g) => (
                    <tr key={g.key} className="even:bg-ash/50">
                      <td className="border-t border-line px-3 py-1.5">
                        {g.range}
                      </td>
                      <td className="border-t border-line px-3 py-1.5 font-semibold">
                        {g.label}
                      </td>
                      <td className="border-t border-line px-3 py-1.5 tabular-nums">
                        {g.points.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* ---------- actions ---------- */}
          <p className="mt-2 text-center text-xs text-neutral-400 sm:hidden">
            Swipe the table sideways to see credits and grade points.
          </p>

          <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCalculate}
              className="rounded-full border-2 border-ink bg-ink px-7 py-2 text-sm font-semibold text-white transition hover:bg-transparent hover:text-ink"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={addSubject}
              className="rounded-full border-2 border-ink bg-white px-7 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              Add subject
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border-2 border-ink bg-white px-7 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
            >
              Reset
            </button>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-amber-700">{message}</p>
          )}

          {sgpa !== null && (
            <p className="mt-6 text-center text-base font-semibold">
              Semester Grade Point Average (SGPA) :{" "}
              <span className="text-2xl tabular-nums">{sgpa.toFixed(2)}</span>
            </p>
          )}

          <p className="mt-6 text-center text-xs text-neutral-400">
            Saved to this browser — open{" "}
            <a href="/results" className="underline">
              Results
            </a>{" "}
            for the cumulative CGPA.
          </p>
        </>
      )}
    </div>
  );
}

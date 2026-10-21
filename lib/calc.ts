import type { GradeKey } from "./grades";
import { GRADE_MAP } from "./grades";
import type { SheetRow } from "./data";

/** A stored subject row — keeps the edited name and credits. */
export interface ResultSubject {
  code: string;
  name: string;
  credits: number;
  grade?: GradeKey;
}

export interface SemesterResult {
  semesterId: string;
  subjects: ResultSubject[];
}

export interface SheetComputation {
  credits: number;
  earnedCredits: number;
  points: number;
  sgpa: number;
  graded: number;
  missing: number;
}

/**
 * SGPA for an editable marksheet:
 *   SGPA = Σ (grade points × credits) ÷ Σ credits (graded subjects only)
 */
export function computeSheet(rows: SheetRow[]): SheetComputation {
  let credits = 0;
  let earnedCredits = 0;
  let points = 0;
  let graded = 0;

  for (const row of rows) {
    const rowCredits = Number.isFinite(row.credits) ? row.credits : 0;
    credits += rowCredits;

    if (!row.grade) continue;

    graded += 1;
    earnedCredits += rowCredits;
    points += GRADE_MAP[row.grade].points * rowCredits;
  }

  return {
    credits: round(credits),
    earnedCredits: round(earnedCredits),
    points: round(points),
    sgpa: earnedCredits > 0 ? points / earnedCredits : 0,
    graded,
    missing: rows.length - graded,
  };
}

/**
 * CGPA across every saved semester:
 *   CGPA = Σ (grade points × credits) ÷ Σ credits
 */
export function computeCgpa(results: SemesterResult[]): number {
  let credits = 0;
  let points = 0;

  for (const result of results) {
    for (const subject of result.subjects) {
      if (!subject.grade) continue;
      const subjectCredits = Number.isFinite(subject.credits)
        ? subject.credits
        : 0;
      credits += subjectCredits;
      points += GRADE_MAP[subject.grade].points * subjectCredits;
    }
  }

  return credits > 0 ? points / credits : 0;
}

/** SGPA for one stored semester result. */
export function computeResult(result: SemesterResult): SheetComputation {
  return computeSheet(
    result.subjects.map((s) => ({
      code: s.code,
      name: s.name,
      credits: s.credits,
      grade: s.grade,
    })),
  );
}

export function classification(cgpa: number): string {
  if (cgpa >= 3.5) return "First Class with Distinction";
  if (cgpa >= 3.0) return "First Class";
  if (cgpa >= 2.5) return "Second Class";
  if (cgpa >= 2.0) return "Pass";
  return "Fail";
}

export function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

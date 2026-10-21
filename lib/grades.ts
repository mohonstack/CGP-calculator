/**
 * Grading scale. Grade points are on a 4.00 scale and are multiplied by the
 * subject credits to obtain the grade points of a subject.
 */
export type GradeKey =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";

export interface Grade {
  key: GradeKey;
  label: string;
  points: number;
  /** Numerical marks that map to this grade. */
  range: string;
}

export const GRADES: Grade[] = [
  { key: "A+", label: "A+", points: 4.0, range: "80% and above" },
  { key: "A", label: "A", points: 3.75, range: "75% to less than 80%" },
  { key: "A-", label: "A-", points: 3.5, range: "70% to less than 75%" },
  { key: "B+", label: "B+", points: 3.25, range: "65% to less than 70%" },
  { key: "B", label: "B", points: 3.0, range: "60% to less than 65%" },
  { key: "B-", label: "B-", points: 2.75, range: "55% to less than 60%" },
  { key: "C+", label: "C+", points: 2.5, range: "50% to less than 55%" },
  { key: "C", label: "C", points: 2.25, range: "45% to less than 50%" },
  { key: "C-", label: "C-", points: 2.0, range: "40% to less than 45%" },
  { key: "D+", label: "D+", points: 1.75, range: "35% to less than 40%" },
  { key: "D", label: "D", points: 1.5, range: "30% to less than 35%" },
  { key: "D-", label: "D-", points: 1.25, range: "25% to less than 30%" },
  { key: "F", label: "F", points: 0, range: "below 25%" },
];

export const GRADE_MAP: Record<GradeKey, Grade> = GRADES.reduce(
  (acc, g) => {
    acc[g.key] = g;
    return acc;
  },
  {} as Record<GradeKey, Grade>,
);

/** Highest possible grade point value. */
export const MAX_GRADE_POINT = 4.0;

/** Points earned for a single subject row. */
export function pointsFor(grade: GradeKey | undefined, credits: number): number {
  if (!grade) return 0;
  return GRADE_MAP[grade].points * credits;
}

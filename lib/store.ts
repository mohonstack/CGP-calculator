"use client";

import { useEffect, useState } from "react";
import type { SemesterResult } from "./calc";

const STORAGE_KEY = "calculatea-your-cgpa.results.v1";

function isValidResult(value: unknown): value is SemesterResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<SemesterResult>;
  if (typeof result.semesterId !== "string") return false;
  if (!Array.isArray(result.subjects)) return false;

  return result.subjects.every((subject) => {
    if (!subject || typeof subject !== "object") return false;
    const s = subject as unknown as Record<string, unknown>;
    return (
      typeof s.name === "string" && typeof s.credits === "number"
    );
  });
}

function read(): SemesterResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidResult);
  } catch {
    return [];
  }
}

function write(results: SemesterResult[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    /* storage unavailable — results simply won't persist */
  }
}

/** Reads the persisted per-semester results. */
export function useStoredResults(): SemesterResult[] {
  const [results, setResults] = useState<SemesterResult[]>([]);

  useEffect(() => {
    setResults(read());
  }, []);

  return results;
}

/** Upserts a single semester result and persists it. */
export function saveResult(result: SemesterResult) {
  const current = read();
  const index = current.findIndex((r) => r.semesterId === result.semesterId);

  if (index >= 0) {
    current[index] = result;
  } else {
    current.push(result);
  }

  write(current);
  return current;
}

/** Removes every stored semester result. */
export function clearResults() {
  write([]);
}

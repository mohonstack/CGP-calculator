# Calculatea Your CGPA

A JNTUH-friendly **GPA / CGPA calculator** built with **Next.js (App Router)**, **React**, **TypeScript** and **Tailwind CSS v4**.

The interface is a faithful recreation of the
[JNTUH GPA Calc](https://www.behance.net/gallery/134790323/JNTUH-GPA-Calc) design by
Sai Kumar Kola — black & white editorial styling, the "%" logo mark, and the
year & semester → subject table workflow.

## Features

- **Editable marksheet** — subject name, subject code, credits and grade can all be changed per row; rows can be added or removed.
- **Year / Semester picker** — the subject list and credits load automatically.
- **4.00 grade point scale** — numerical marks map to letter grades and grade points (A+ 4.00 → F 0.00).
- **Instant SGPA** — `Σ (grade points × credits) ÷ Σ credits`.
- **Cumulative CGPA** across every saved semester, with the classification badge.
- **Results saved locally** in the browser (`localStorage`) — no account, no server. Unsaved edits are kept when you switch semesters.
- **Result links** page pointing at the official JNTUH results portal.
- Fully responsive, keyboard accessible, statically prerendered.

## Grading scale

| Numerical marks | Letter grade | Grade point |
| --- | --- | --- |
| 80% and above | A+ | 4.00 |
| 75% to less than 80% | A | 3.75 |
| 70% to less than 75% | A- | 3.50 |
| 65% to less than 70% | B+ | 3.25 |
| 60% to less than 65% | B | 3.00 |
| 55% to less than 60% | B- | 2.75 |
| 50% to less than 55% | C+ | 2.50 |
| 45% to less than 50% | C | 2.25 |
| 40% to less than 45% | C- | 2.00 |
| 35% to less than 40% | D+ | 1.75 |
| 30% to less than 35% | D | 1.50 |
| 25% to less than 30% | D- | 1.25 |
| below 25% | F | 0.00 |

> The rows below **C+ 2.50** continue the same 0.25 step pattern — adjust them in
> `lib/grades.ts` if your college uses a different cut-off.

### CGPA classification

| CGPA | Classification |
| --- | --- |
| 3.50 – 4.00 | First Class with Distinction |
| 3.00 – 3.49 | First Class |
| 2.50 – 2.99 | Second Class |
| 2.00 – 2.49 | Pass |
| Below 2.00 | Fail |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.tsx          # fonts, header, footer
  page.tsx            # home / hero
  calc-gpa/page.tsx   # the calculator
  results/page.tsx    # semester GPAs + cumulative CGPA
  result-links/page.tsx
  how-it-works/page.tsx
  icon.svg            # favicon (the % mark)
components/
  Calculator.tsx      # subject table + SGPA calculation
  CgpaSummary.tsx     # results breakdown
  Illustration.tsx    # hero artwork
  Logo.tsx            # % mark, wordmark, watermark
  RocketIcon.tsx
lib/
  data.ts             # subject bank, credits, result links
  grades.ts           # grading scale (numerical marks → letter → points)
  calc.ts             # SGPA / CGPA math
  store.ts            # localStorage persistence
```

## Notes

- The subject bank follows the JNTUH R18 credit distribution. Always cross-check
  with your official results — this project is not affiliated with JNTUH.
- Grades are stored only in your browser; nothing is sent to a server.

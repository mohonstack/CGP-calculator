# Calculatea Your CGPA

A **responsive GPA / CGPA calculator** built with **Next.js**, **React**, **TypeScript** and **Tailwind CSS v4**. Calculate SGPA and cumulative CGPA with editable subjects, credit-based grading, and localStorage result tracking.

**Calculatea Your CGPA** is a fast, privacy-first web app that turns a marksheet into an
instant SGPA and a weighted cumulative CGPA. Pick a year and semester, the subject list
and credit values load automatically, you pick a letter grade for each subject, and the
calculator does the arithmetic exactly the way the university does it — grade points ×
credits, totalled and divided by total credits.

The interface is a faithful recreation of the
[GPA Calc](https://www.behance.net/gallery/134790323/JNTUH-GPA-Calc) design by
Sai Kumar Kola — black & white editorial styling, the "%" logo mark, and the
year & semester → subject table workflow.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [How the calculation works](#how-the-calculation-works)
- [Grading scale](#grading-scale)
- [CGPA classification](#cgpa-classification)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Data & privacy](#data--privacy)
- [Customising the calculator](#customising-the-calculator)
- [Design credits](#design-credits)
- [Disclaimer](#disclaimer)

---

## Features

### Calculator

- **Year / Semester picker** — 12 semesters (4 years × 3 semesters) following the
  tri-semester pattern; the subject list and credits load automatically on selection.
- **Editable marksheet** — subject name, subject code, credits and grade can all be
  changed per row; rows can be added or removed freely.
- **Pre-loaded subject bank** — 95 subjects with codes and credits for the JNTUH R18
  credit distribution (CSE / IT style curriculum).
- **Live grade points column** — each row shows `grade points × credits` as you type,
  with a running TOTAL row for credits and points.
- **Add / remove subjects** — add a custom row with a `CUSTOM<n>` code or delete any row
  that does not belong to your scheme.
- **Reset** — restores the default subject list for the selected semester in one click.
- **Instant SGPA** — `Σ (grade points × credits) ÷ Σ credits`.
- **Incomplete-grade warning** — if some subjects are still ungraded, the app tells you
  how many are missing and computes the SGPA from the graded subjects only.

### Results

- **Cumulative CGPA** across every saved semester, with the classification badge
  (First Class with Distinction → Fail).
- **Semester-wise breakdown** grouped by year (I → IV) with each semester's SGPA.
- **Clear all** — wipes every saved semester from the browser in one click.
- **Results are linked to the calculator**, so the numbers on this page always reflect the
  latest marksheet you submitted.

### Content & navigation

- **Result links page** pointing at the official JNTUH results portal — regular and
  supplementary examination links for all 12 semesters.
- **How it works page** — the formula and the full grading scale explained in four steps.
- **Editorial landing page** — hero, feature strip, shortcut cards and a custom SVG
  illustration.

### Design & quality

- **Editorial black & white styling** with a single blue accent, custom Inter + Archivo
  typography and a hand-drawn "%" logo mark used as favicon, wordmark and watermark.
- **Fully responsive** — the subject table scrolls horizontally on small screens with a
  slim custom scrollbar and a swipe hint for mobile.
- **Keyboard accessible** — every control is a real form element with a label or
  `aria-label`, visible focus rings and semantic tables.
- **Print friendly** — a `no-print` utility hides the controls so a marksheet can be
  printed or saved as a PDF.
- **Statically prerendered** — all routes are static, so the app loads instantly and can
  be hosted on any static platform.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router, React Server Components) |
| UI | React 19 |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file needed) |
| Fonts | `next/font` — Inter (body) and Archivo (display) |
| Persistence | Browser `localStorage` — no backend, no accounts |
| Build | Turbopack dev server, statically prerendered production output |

---

## How the calculation works

```
SGPA = Σ (Grade Points × Credits) ÷ Σ Credits
CGPA = Σ (SGPA × Semester Credits) ÷ Σ Semester Credits
```

Internally the app takes the second, equivalent form: it sums the grade points of every
graded subject across every saved semester and divides by the total credits of those
semesters, so ungraded subjects never drag the average down.

- Only subjects with a grade count towards the totals.
- Credits are rounded to two decimals for display; SGPA and CGPA are rounded to two
  decimals.
- A semester with zero graded credits reports `0` instead of `NaN`.

---

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

---

## Getting started

Requirements: **Node.js 18.18+** and npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint     # lint the project (ESLint, flat config)
npm run typecheck # TypeScript check without emitting
```

---

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
  SiteHeader.tsx      # header + footer
lib/
  data.ts             # subject bank, credits, result links
  grades.ts           # grading scale (numerical marks → letter → points)
  calc.ts             # SGPA / CGPA math
  store.ts            # localStorage persistence
  utils.ts            # class-name helper
eslint.config.mjs     # ESLint flat config (next/core-web-vitals + next/typescript)
```

---

## Data & privacy

- Everything runs in the browser. There is **no account, no server and no tracking**.
- Saved results live under the `localStorage` key `calculatea-your-cgpa.results.v1`.
- Stored data is validated on read, and a failed or unavailable storage (private mode,
  quota exceeded) never breaks the calculator — it just stops persisting.
- Clearing your browser data, or pressing **Clear all** on the results page, removes
  everything.

---

## Customising the calculator

| I want to change… | Edit |
| --- | --- |
| The grade scale / cut-offs | `lib/grades.ts` |
| Subjects and credits per semester | `lib/data.ts` |
| The CGPA classification bands | `classification()` in `lib/calc.ts` |
| Colours, fonts and spacing | the `@theme` block in `app/globals.css` |
| The result portal links | `RESULT_LINKS` / `RESULT_PORTAL_URL` in `lib/data.ts` |

Every subject is editable in the UI as well, so a college with a different scheme can
simply overwrite the values without touching the code.

---

## Design credits

The visual design is inspired by the
[GPA Calc](https://www.behance.net/gallery/134790323/JNTUH-GPA-Calc) concept by
Sai Kumar Kola. This project is a clean-room implementation.

---

## Disclaimer

The subject bank follows the JNTUH R18 credit distribution. Always cross-check with your
official results — this project is not affiliated with or endorsed by JNTUH.

import type { GradeKey } from "./grades";

/**
 * Subject bank with credits, organised by year and semester.
 * The scheme runs on a tri-semester pattern — three semesters per year over
 * four years (12 semesters in total).
 *
 * The credits follow the JNTUH style credit distribution used by most
 * affiliated colleges. Every field stays editable in the calculator, so a
 * college with a different scheme can simply overwrite the values.
 */

export interface Subject {
  code: string;
  name: string;
  credits: number;
}

export type SemesterNumber = 1 | 2 | 3;

export interface Semester {
  id: string;
  year: number;
  semester: SemesterNumber;
  label: string;
  subjects: Subject[];
}

/** One editable row of the marksheet. */
export interface SheetRow {
  code: string;
  name: string;
  credits: number;
  grade?: GradeKey;
}

export const ROMAN_YEARS = ["", "I", "II", "III", "IV"];
export const ROMAN_SEMESTERS = ["", "I", "II", "III"];
export const ORDINALS = ["", "st", "nd", "rd"];

/** "I", "II" or "III" */
export function romanSemester(semester: number): string {
  return ROMAN_SEMESTERS[semester] ?? String(semester);
}

/** "1st", "2nd" or "3rd" */
export function semesterOrdinal(semester: number): string {
  return `${semester}${ORDINALS[semester] ?? "th"}`;
}

const raw: Record<string, Subject[]> = {
  /* ------------------------------- YEAR I ------------------------------- */
  "1-1": [
    { code: "BEEE101", name: "Basic Electrical Engineering", credits: 3 },
    { code: "BEEE101L", name: "Basic Electrical Engineering Lab", credits: 1 },
    { code: "BEEE102", name: "Mathematics I", credits: 4 },
    { code: "CHEM101", name: "Engineering Chemistry", credits: 4 },
    { code: "CHEM101L", name: "Engineering Chemistry Lab", credits: 1.5 },
    { code: "ENGLISH101", name: "English Language and Communication Skills", credits: 2 },
    { code: "ENGLISH101L", name: "English Language and Communication Skills Lab", credits: 1 },
    { code: "EWORKS", name: "Engineering Workshop", credits: 2.5 },
  ],
  "1-2": [
    { code: "BMEE101", name: "Basic Mechanical Engineering", credits: 3 },
    { code: "BMEE101L", name: "Basic Mechanical Engineering Lab", credits: 1 },
    { code: "ENGG101", name: "Engineering Graphics", credits: 2 },
    { code: "ENGG101L", name: "Engineering Graphics Lab", credits: 1 },
    { code: "BEEE102", name: "Mathematics II", credits: 4 },
    { code: "PHY101", name: "Physics for Mechanical Engineers", credits: 3 },
    { code: "PHY101L", name: "Physics Lab", credits: 1 },
    { code: "ENGLISH102", name: "English for Engineers", credits: 2 },
    { code: "ICULT", name: "Indian Culture and Heritage", credits: 2 },
  ],
  "1-3": [
    { code: "PROG101", name: "Programming for Engineers", credits: 3 },
    { code: "PROG101L", name: "Programming for Engineers Lab", credits: 1 },
    { code: "PHY102", name: "Engineering Physics", credits: 3 },
    { code: "PHY102L", name: "Engineering Physics Lab", credits: 1 },
    { code: "BEEE103", name: "Mathematics III", credits: 4 },
    { code: "THERMO101", name: "Engineering Thermodynamics", credits: 3 },
    { code: "THERMO101L", name: "Engineering Thermodynamics Lab", credits: 1 },
    { code: "TECCOM", name: "Technical Communication", credits: 2 },
    { code: "SUSTAIN", name: "Sustainability and Engineering Ethics", credits: 1 },
  ],

  /* ------------------------------- YEAR II ------------------------------ */
  "2-1": [
    { code: "CS201", name: "Data Structures", credits: 3 },
    { code: "CS201L", name: "Data Structures Lab", credits: 1 },
    { code: "EC201", name: "Digital Logic Design", credits: 3 },
    { code: "EC201L", name: "Digital Logic Design Lab", credits: 1 },
    { code: "MA201", name: "Discrete Mathematical Structures", credits: 3 },
    { code: "CS202", name: "Computer Organization and Architecture", credits: 3 },
    { code: "CS203", name: "Object Oriented Programming through Java", credits: 3 },
    { code: "CS203L", name: "Object Oriented Programming Lab", credits: 1 },
    { code: "MA202", name: "Analytical and Descriptive Statistics", credits: 3 },
  ],
  "2-2": [
    { code: "CS204", name: "Unix and Shell Programming", credits: 3 },
    { code: "CS204L", name: "Unix and Shell Programming Lab", credits: 1 },
    { code: "CS205", name: "Software Engineering", credits: 3 },
    { code: "CS206", name: "Database Management Systems", credits: 3 },
    { code: "CS206L", name: "Database Management Systems Lab", credits: 1 },
    { code: "CS207", name: "Java Programming", credits: 3 },
    { code: "CS207L", name: "Java Programming Lab", credits: 1 },
    { code: "CS208", name: "Web Programming", credits: 3 },
    { code: "CS208L", name: "Web Programming Lab", credits: 1 },
    { code: "PEV202", name: "Professional Ethics and Values", credits: 2 },
  ],
  "2-3": [
    { code: "CS209", name: "Design and Analysis of Algorithms", credits: 3 },
    { code: "CS209L", name: "Design and Analysis of Algorithms Lab", credits: 1 },
    { code: "CS210", name: "Computer Networks", credits: 3 },
    { code: "CS210L", name: "Computer Networks Lab", credits: 1 },
    { code: "CS211", name: "Operating Systems", credits: 3 },
    { code: "CS211L", name: "Operating Systems Lab", credits: 1 },
    { code: "CS212", name: "Software Testing", credits: 3 },
    { code: "MA203", name: "Management Science", credits: 2 },
    { code: "CS213", name: "Object Oriented Analysis and Design", credits: 3 },
    { code: "CS213L", name: "Object Oriented Analysis and Design Lab", credits: 1 },
  ],

  /* ------------------------------ YEAR III ------------------------------ */
  "3-1": [
    { code: "CS301", name: "Artificial Intelligence", credits: 3 },
    { code: "CS301L", name: "Artificial Intelligence Lab", credits: 1 },
    { code: "CS302", name: "Compiler Design", credits: 3 },
    { code: "CS302L", name: "Compiler Design Lab", credits: 1 },
    { code: "CS303", name: "Networks and Security", credits: 3 },
    { code: "CS303L", name: "Networks and Security Lab", credits: 1 },
    { code: "CS304", name: "Open Source Technologies", credits: 2 },
    { code: "CS305", name: "Data Warehousing and Data Mining", credits: 3 },
    { code: "CS306", name: "Cloud Computing", credits: 3 },
  ],
  "3-2": [
    { code: "CS307", name: "Machine Learning", credits: 3 },
    { code: "CS307L", name: "Machine Learning Lab", credits: 1 },
    { code: "CS308", name: "Principles of Programming Languages", credits: 3 },
    { code: "CS309", name: "Mobile Application Development", credits: 3 },
    { code: "CS309L", name: "Mobile Application Development Lab", credits: 1 },
    { code: "CS310", name: "Internet of Things", credits: 3 },
    { code: "CS310L", name: "Internet of Things Lab", credits: 1 },
    { code: "CS311", name: "Software Project Management", credits: 3 },
    { code: "MA301", name: "Human Resource Management", credits: 2 },
  ],
  "3-3": [
    { code: "CS312", name: "Deep Learning", credits: 3 },
    { code: "CS312L", name: "Deep Learning Lab", credits: 1 },
    { code: "CS313", name: "Data Science", credits: 3 },
    { code: "CS313L", name: "Data Science Lab", credits: 1 },
    { code: "CS314", name: "Big Data Analytics", credits: 3 },
    { code: "CS314L", name: "Big Data Analytics Lab", credits: 1 },
    { code: "CS315", name: "Cyber Security", credits: 3 },
    { code: "CS316", name: "Software Architecture", credits: 3 },
    { code: "ENT301", name: "Entrepreneurship Development", credits: 2 },
  ],

  /* ------------------------------- YEAR IV ------------------------------- */
  "4-1": [
    { code: "CS401", name: "Full Stack Development", credits: 4 },
    { code: "CS401L", name: "Full Stack Development Lab", credits: 2 },
    { code: "CS402", name: "DevOps", credits: 3 },
    { code: "CS402L", name: "DevOps Lab", credits: 1 },
    { code: "CS403", name: "Advanced Web Technologies", credits: 3 },
    { code: "CS403L", name: "Advanced Web Technologies Lab", credits: 1 },
    { code: "CS404", name: "Software Quality Assurance", credits: 3 },
    { code: "CS405", name: "Professional Practice and Standards", credits: 3 },
  ],
  "4-2": [
    { code: "CS406", name: "Project Work", credits: 12 },
    { code: "INDTRN", name: "Industrial Training", credits: 6 },
  ],
  "4-3": [
    { code: "CS407", name: "Project Work Part II", credits: 10 },
    { code: "INTERNSHIP", name: "Industry Internship and Report", credits: 6 },
    { code: "SEMINAR", name: "Technical Seminar", credits: 2 },
  ],
};

export const SEMESTERS: Semester[] = Object.entries(raw).map(([key, subjects]) => {
  const [year, semester] = key.split("-").map(Number) as [number, SemesterNumber];
  return {
    id: key,
    year,
    semester,
    label: `${ROMAN_YEARS[year]} Year ${romanSemester(semester)} Semester`,
    subjects,
  };
});

export function getSemester(id: string): Semester | undefined {
  return SEMESTERS.find((s) => s.id === id);
}

export function totalCredits(semester: Semester): number {
  return semester.subjects.reduce((sum, s) => sum + s.credits, 0);
}

/** Builds a fresh, editable marksheet for a semester. */
export function defaultSheet(semester: Semester): SheetRow[] {
  return semester.subjects.map((subject) => ({
    code: subject.code,
    name: subject.name,
    credits: subject.credits,
  }));
}

/**
 * Result links for the JNTUH results portal — three semesters per year,
 * each with a regular and a supplementary examination link.
 */
export const RESULT_LINKS: { year: number; links: string[] }[] = [1, 2, 3, 4].map(
  (year) => ({
    year,
    links: [1, 2, 3].flatMap((semester) => [
      `${ROMAN_YEARS[year]} Year ${romanSemester(semester)} Semester (R18) Regular Examinations Results`,
      `${ROMAN_YEARS[year]} Year ${romanSemester(semester)} Semester (R18) Supplementary Examinations Results`,
    ]),
  }),
);

export const RESULT_PORTAL_URL = "https://results.jntuh.ac.in/";

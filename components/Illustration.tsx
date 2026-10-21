/**
 * Flat illustration: a team presenting a growth chart — mirrors the hero
 * artwork of the original GPA Calc design.
 */
export function Illustration({ className }: { className?: string }) {
  const ink = "#111111";
  const skin = "#f2c8a5";
  const accent = "#ef4444";
  const soft = "#e5e5e5";

  return (
    <svg
      viewBox="0 0 760 430"
      fill="none"
      role="img"
      aria-label="Illustration of a team reviewing a growth chart"
      className={className}
    >
      <defs>
        <filter id="boardShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0a0a0a" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* ---------- presentation board ---------- */}
      <g filter="url(#boardShadow)">
        <rect x="168" y="14" width="424" height="252" rx="14" fill="#ffffff" stroke={soft} strokeWidth="2" />
        <path d="M168 48h424" stroke={soft} strokeWidth="2" />
        <circle cx="190" cy="31" r="5" fill={soft} />
        <circle cx="207" cy="31" r="5" fill={soft} />
        <circle cx="224" cy="31" r="5" fill={soft} />
        <rect x="570" y="24" width="10" height="14" rx="4" fill={soft} />
      </g>

      {/* inner slide */}
      <rect x="196" y="66" width="368" height="178" rx="10" fill="#fbfbfb" stroke="#efefef" strokeWidth="2" />

      {/* bullet list */}
      <g fill={soft}>
        <circle cx="220" cy="94" r="5" />
        <circle cx="220" cy="116" r="5" />
        <circle cx="220" cy="138" r="5" />
        <rect x="236" y="89" width="86" height="9" rx="4.5" />
        <rect x="236" y="111" width="62" height="9" rx="4.5" />
        <rect x="236" y="133" width="74" height="9" rx="4.5" />
      </g>

      {/* bar chart on the slide */}
      <g>
        <rect x="352" y="176" width="30" height="48" rx="3" fill={ink} />
        <rect x="396" y="150" width="30" height="74" rx="3" fill={ink} />
        <rect x="440" y="126" width="30" height="98" rx="3" fill={ink} />
        <rect x="484" y="160" width="30" height="64" rx="3" fill="#c9c9c9" />
        <rect x="528" y="186" width="30" height="38" rx="3" fill="#c9c9c9" />
        <path d="M344 226h222" stroke={soft} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* ---------- person on the left (holding a tablet) ---------- */}
      <g>
        <ellipse cx="116" cy="410" rx="42" ry="8" fill="#111" opacity="0.07" />
        <path d="M106 352v52" stroke={ink} strokeWidth="10" strokeLinecap="round" />
        <path d="M130 352v52" stroke={ink} strokeWidth="10" strokeLinecap="round" />
        <path d="M101 404h10" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M125 404h10" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M100 286q16-14 34 0l5 70H96z" fill={accent} />
        <path d="M101 300q-14 16-4 30" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M133 300q18 6 26 18" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="117" cy="266" r="17" fill={skin} />
        <path d="M100 266a17 17 0 0 1 34 0q-5-15-17-15t-17 15z" fill={ink} />
        <g transform="translate(152 300) rotate(-14)">
          <rect width="48" height="64" rx="6" fill={ink} />
          <rect x="6" y="7" width="36" height="50" rx="3" fill="#ffffff" />
          <rect x="12" y="16" width="24" height="5" rx="2.5" fill={soft} />
          <rect x="12" y="27" width="18" height="5" rx="2.5" fill={soft} />
          <rect x="12" y="38" width="21" height="5" rx="2.5" fill={soft} />
        </g>
      </g>

      {/* ---------- person in the middle (raising a chart) ---------- */}
      <g>
        <ellipse cx="356" cy="410" rx="48" ry="9" fill="#111" opacity="0.07" />
        <path d="M340 350v54" stroke={ink} strokeWidth="11" strokeLinecap="round" />
        <path d="M372 350v54" stroke={ink} strokeWidth="11" strokeLinecap="round" />
        <path d="M332 404h12" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M366 404h12" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M330 262q26-16 52 0l5 90h-62z" fill={ink} />
        <path d="M334 278q-22-32-12-60" stroke={ink} strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M378 278q22-32 12-60" stroke={ink} strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="356" cy="242" r="18" fill={skin} />
        <path d="M339 240a17 17 0 0 1 34 0z" fill={ink} />
        <g transform="translate(316 130)">
          <rect width="140" height="88" rx="8" fill="#ffffff" stroke={ink} strokeWidth="3" />
          <rect x="16" y="52" width="16" height="24" rx="2" fill={ink} />
          <rect x="44" y="36" width="16" height="40" rx="2" fill={ink} />
          <rect x="72" y="20" width="16" height="56" rx="2" fill={accent} />
          <rect x="100" y="44" width="16" height="32" rx="2" fill="#c9c9c9" />
          <path d="M12 78h116" stroke="#e5e5e5" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* ---------- person on the right (holding a report) ---------- */}
      <g>
        <ellipse cx="600" cy="410" rx="44" ry="8" fill="#111" opacity="0.07" />
        <path d="M588 352v52" stroke={ink} strokeWidth="10" strokeLinecap="round" />
        <path d="M612 352v52" stroke={ink} strokeWidth="10" strokeLinecap="round" />
        <path d="M582 404h11" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M607 404h11" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M580 284q20-15 40 0l4 72h-48z" fill={ink} />
        <path d="M616 296q24-8 30-30" stroke={ink} strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="600" cy="264" r="17" fill={skin} />
        <path d="M583 262a17 17 0 0 1 34 0q-6-16-17-16t-17 16z" fill={ink} />
        <g transform="translate(626 218) rotate(10)">
          <rect width="96" height="72" rx="7" fill="#ffffff" stroke={ink} strokeWidth="3" />
          <circle cx="34" cy="36" r="20" fill="none" stroke={ink} strokeWidth="3" />
          <path d="M34 36l13-16a20 20 0 0 1 6 25z" fill={accent} />
          <rect x="62" y="22" width="22" height="6" rx="3" fill={soft} />
          <rect x="62" y="34" width="22" height="6" rx="3" fill={soft} />
          <rect x="62" y="46" width="14" height="6" rx="3" fill={soft} />
        </g>
      </g>
    </svg>
  );
}

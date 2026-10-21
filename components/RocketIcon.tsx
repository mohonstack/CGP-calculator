export function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g transform="rotate(-40 12 12)">
        <path
          d="M12 1.8c2.8 2.6 4.3 6 4.3 9.6 0 1.6-.3 3-.8 4.3H8.5c-.5-1.3-.8-2.7-.8-4.3 0-3.6 1.5-7 4.3-9.6Z"
          fill="currentColor"
        />
        <circle cx="12" cy="9.1" r="2.1" fill="#fff" />
        <path d="M8.4 13.6 5.3 16v3.4l3.2-1.7v-4.1Z" fill="currentColor" />
        <path d="M15.6 13.6 18.7 16v3.4l-3.2-1.7v-4.1Z" fill="currentColor" />
        <path
          d="M10.4 17.4h3.2L12 22.3l-1.6-4.9Z"
          fill="currentColor"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

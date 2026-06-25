export default function GrowthPath({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 150 C 150 150, 180 60, 320 70 C 460 80, 480 170, 620 140 C 720 118, 740 60, 790 40"
        stroke="#A3B89B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
      <circle cx="10" cy="150" r="6" fill="#7C9473" />
      <circle cx="320" cy="70" r="6" fill="#D98C6B" />
      <circle cx="620" cy="140" r="6" fill="#7C9473" />
      <circle cx="790" cy="40" r="7" fill="#D98C6B" />
    </svg>
  );
}

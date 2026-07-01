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
        stroke="#C8872A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 10"
        strokeOpacity="0.4"
      />
      <circle cx="10" cy="150" r="6" fill="#C8872A" fillOpacity="0.5" />
      <circle cx="320" cy="70" r="6" fill="#6B7C5A" fillOpacity="0.6" />
      <circle cx="620" cy="140" r="6" fill="#C8872A" fillOpacity="0.5" />
      <circle cx="790" cy="40" r="7" fill="#6B7C5A" fillOpacity="0.6" />
    </svg>
  );
}

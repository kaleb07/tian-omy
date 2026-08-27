export function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.8">
        <path d="M4,4 C 50,10 85,45 105,90 C 120,125 145,150 180,180" />
        <path d="M28,18 C 45,32 55,52 60,74" />
      </g>
      <g fill="currentColor" opacity="0.85">
        <ellipse cx="18" cy="14" rx="9" ry="4" transform="rotate(50 18 14)" />
        <ellipse cx="30" cy="8" rx="6" ry="3" transform="rotate(-10 30 8)" />
        <ellipse cx="40" cy="26" rx="10" ry="4.2" transform="rotate(55 40 26)" />
        <ellipse cx="55" cy="15" rx="7" ry="3" transform="rotate(5 55 15)" />
        <ellipse cx="63" cy="42" rx="11" ry="4.5" transform="rotate(58 63 42)" />
        <ellipse cx="80" cy="32" rx="8" ry="3.5" transform="rotate(15 80 32)" />
        <ellipse cx="85" cy="62" rx="10" ry="4" transform="rotate(52 85 62)" />
        <ellipse cx="100" cy="52" rx="7" ry="3" transform="rotate(10 100 52)" />
        <ellipse cx="105" cy="85" rx="9" ry="3.8" transform="rotate(50 105 85)" />
        <ellipse cx="122" cy="78" rx="6.5" ry="3" transform="rotate(12 122 78)" />
        <ellipse cx="122" cy="105" rx="8" ry="3.5" transform="rotate(48 122 105)" />
        <ellipse cx="138" cy="100" rx="6" ry="2.8" transform="rotate(15 138 100)" />
        <ellipse cx="140" cy="128" rx="7" ry="3" transform="rotate(45 140 128)" />
        <ellipse cx="155" cy="150" rx="6" ry="2.6" transform="rotate(40 155 150)" />
        <ellipse cx="168" cy="165" rx="5" ry="2.2" transform="rotate(35 168 165)" />
      </g>
      <g fill="var(--color-gold-light)">
        <circle cx="12" cy="10" r="1.6" />
        <circle cx="45" cy="20" r="2" />
        <circle cx="70" cy="50" r="2.2" />
        <circle cx="95" cy="80" r="1.8" />
        <circle cx="130" cy="115" r="2" />
      </g>
    </svg>
  );
}

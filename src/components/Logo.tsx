interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 28, className = '' }: LogoProps) {
  const height = size;
  const width = size * (28 / 34);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="8" y="2" width="12" height="4" rx="1.5" fill="currentColor" />
      <polygon
        points="4,32 24,32 20,12 8,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="24" r="3.5" fill="#F8E731" />
    </svg>
  );
}

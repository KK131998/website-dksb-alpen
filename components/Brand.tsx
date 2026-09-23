export function BrandLogo({ className = "h-14 w-auto" }: { className?: string }) {
  return (
    <img
      src="/logos/dksb-alpen.jpg"
      alt="Der Kinderschutzbund e.V. Ortsverband Alpen"
      className={className}
    />
  );
}

export function BundesverbandLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src="/logos/dksb-bundesverband.png"
      alt="Der Kinderschutzbund Bundesverband"
      className={className}
    />
  );
}

export function BlobShape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 520"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M92 262c-38-78 12-176 98-214 86-38 168-8 236 46 68 54 132 86 132 154s-78 148-168 184c-90 36-198 18-258-42-60-60-52-80-40-128Z" />
    </svg>
  );
}

export function WaveBand({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 72c120-48 240-48 360 0s240 48 360 0 240-48 360 0 240 48 360 0v48H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

type Stroke = {
  fill: "none";
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round";
  strokeLinejoin: "round";
};

function stroke(color: string): Stroke {
  return {
    fill: "none",
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

export function MitmachenIcon({ id, color }: { id: string; color: string }) {
  if (id === "spenden") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M20 33s-11-7.2-11-15.2A6.4 6.4 0 0 1 20 13.5 6.4 6.4 0 0 1 31 17.8C31 25.8 20 33 20 33Z"
          {...stroke(color)}
        />
      </svg>
    );
  }

  if (id === "mitglied") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="12" cy="12" r="4" {...stroke(color)} />
        <circle cx="28" cy="12" r="4" {...stroke(color)} />
        <circle cx="20" cy="18" r="3.2" {...stroke(color)} />
        <path
          d="M5.5 32c1-7.5 3.4-11 6.5-11M34.5 32c-1-7.5-3.4-11-6.5-11M14 32c1.1-5.5 2.8-7.5 6-7.5s4.9 2 6 7.5"
          {...stroke(color)}
        />
      </svg>
    );
  }

  if (id === "ehrenamt") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M14 22v-6.5a3 3 0 0 1 6 0V22M20 15.5V22M20 16.5a3 3 0 0 1 6 0V22M26 17.5a3 3 0 0 1 6 0V23c0 5.5-4 9-12 13-8-4-12-7.5-12-13v-4.5a3 3 0 0 1 6 0V22"
          {...stroke(color)}
        />
        <path
          d="M20 12.5s-3.2-2.2-3.2-4.4A2.2 2.2 0 0 1 20 6.5a2.2 2.2 0 0 1 3.2 1.6c0 2.2-3.2 4.4-3.2 4.4Z"
          {...stroke(color)}
        />
      </svg>
    );
  }

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="14" cy="14" r="4.2" {...stroke(color)} />
      <circle cx="27" cy="16" r="3.6" {...stroke(color)} />
      <path d="M6.5 32c1-8 3.8-12 7.5-12s6.4 4 7.5 12" {...stroke(color)} />
      <path d="M20 32c1-7 3.4-10.5 6.8-10.5S33.6 25 34.5 32" {...stroke(color)} />
    </svg>
  );
}

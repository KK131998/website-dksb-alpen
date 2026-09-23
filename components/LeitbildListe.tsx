const TRIANGLE_COLORS = ["#e67e22", "#8cc63f", "#194e9e", "#c2187a", "#e67e22"];

export function LeitbildListe({ items }: { items: string[] }) {
  return (
    <ul className="ml-8 list-none space-y-3 sm:ml-14">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-[var(--muted)] leading-7">
          <span
            className="mt-[0.55rem] h-0 w-0 shrink-0 border-y-[5px] border-y-transparent border-l-[9px]"
            style={{ borderLeftColor: TRIANGLE_COLORS[index % TRIANGLE_COLORS.length] }}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

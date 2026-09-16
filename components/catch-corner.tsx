export function CatchCorner({ date, place }: { date?: string; place?: string }) {
  if (!date && !place) return null;

  return (
    <span className="catch-corner">
      {date && <span className="catch-corner-date">{date}</span>}
      {place && <span>{place}</span>}
    </span>
  );
}

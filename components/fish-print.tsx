import { FishSwimmer } from './fish-swimmer';
import { FieldFrame } from './field-frame';
import { CatchCorner } from './catch-corner';

export function FishPrint({ id, name, lockedLabel, date, place }: {
  id: string;
  name: string;
  lockedLabel?: string;
  date?: string;
  place?: string;
}) {
  return (
    <FieldFrame className="fish-print">
      <span className="fish-print-sheet">
        <span className="fish-print-stage"><FishSwimmer id={id} /></span>
        <span className="fish-print-name">{name}</span>
        <CatchCorner date={date} place={place} />
        {lockedLabel && <span className="fish-print-stamp">{lockedLabel}</span>}
      </span>
    </FieldFrame>
  );
}

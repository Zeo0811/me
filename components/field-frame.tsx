import type { ReactNode } from 'react';

export function FrameRails() {
  return (
    <span className="frame-rails" aria-hidden="true">
      <i className="frame-rail frame-rail-top" />
      <i className="frame-rail frame-rail-right" />
      <i className="frame-rail frame-rail-bottom" />
      <i className="frame-rail frame-rail-left" />
    </span>
  );
}

export function FieldFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`field-frame ${className}`}>
      <FrameRails />
      <span className="frame-mat">{children}</span>
    </span>
  );
}

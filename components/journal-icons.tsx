/** Icon geometry from Lucide v1.31.0, ISC license. Rendered without a context provider. */
import type { SVGProps } from 'react';
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
function Icon({ size = 24, children, ...props }: IconProps) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden={props['aria-label'] ? undefined : true} {...props}>{children}</svg>;
}
export function ArrowUpRight(props: IconProps) { return <Icon {...props}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></Icon>; }
export function ArrowDown(props: IconProps) { return <Icon {...props}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></Icon>; }
export function Mail(props: IconProps) { return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>; }
export function Check(props: IconProps) { return <Icon {...props}><path d="M20 6 9 17l-5-5"/></Icon>; }
export function Plus(props: IconProps) { return <Icon {...props}><path d="M5 12h14"/><path d="M12 5v14"/></Icon>; }
export function Waves(props: IconProps) { return <Icon {...props}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/></Icon>; }

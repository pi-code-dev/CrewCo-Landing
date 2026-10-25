/* eslint-disable @next/next/no-img-element */
// The CrewCo app icon from /public. Decorative: the wordmark text sits beside it.
export function Logo({ size = 28 }: { size?: number }) {
  return <img src="/crewco-app-icon.svg" width={size} height={size} alt="" />;
}

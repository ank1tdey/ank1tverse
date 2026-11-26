'use client';

import { useEffect, useState } from 'react';

// The current time in Kolkata, ticking every second.
export default function LiveTime({ timeZone, label }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const text = now
    ? new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now)
    : '';

  return (
    <span className="live-time">
      <span className="sr-only">Local time in Kolkata: </span>
      <time dateTime={now ? now.toISOString() : undefined}>{text}</time> {label}
    </span>
  );
}

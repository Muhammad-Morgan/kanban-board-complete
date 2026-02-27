// last-resort fallback (layout-level / uncaught)
"use client";

import { Button } from "@/components/atom/button";

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h1>System Crashed...</h1>
        <Button onClick={() => reset()}>Reload</Button>
      </body>
    </html>
  );
}

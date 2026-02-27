import { Button } from "@/components/ui/button";

// for runtime errors
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong...</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

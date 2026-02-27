import { Button } from "./button";
import { Spinner } from "./spinner";

interface SubmitButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const SubmitButton = ({
  isLoading = false,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={isLoading ? "opacity-70" : undefined}
    >
      {isLoading ? (
        <>
          <Spinner className="size-4" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

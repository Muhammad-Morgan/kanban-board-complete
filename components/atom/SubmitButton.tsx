import { Button } from "./button";

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
      className="btn btn-primary"
      style={{ opacity: isLoading ? 0.7 : 1 }}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

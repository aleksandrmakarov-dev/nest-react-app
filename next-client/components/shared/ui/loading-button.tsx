import React from "react";
import { Button, ButtonProps } from "./button";
import { cva } from "class-variance-authority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, disabled, children, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={disabled ?? loading} {...props}>
        <span className="flex gap-x-1 items-center">
          {loading && (
            <FontAwesomeIcon icon={faSpinner} className="w-5 h-5" spinPulse />
          )}
          {children}
        </span>
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };

import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DialogBaseProps {
  trigger: JSX.Element;
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isError?: boolean;
  error?: string;
}

export function DialogBase(props: DialogBaseProps) {
  const {
    trigger,
    title,
    description,
    open,
    setOpen,
    children,
    actions,
    isError,
    error,
  } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {isError && (
          <Alert variant="error" className="mb-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {children}
        {actions && <DialogFooter>{actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

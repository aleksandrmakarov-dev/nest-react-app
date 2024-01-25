import { useState, useRef, Dispatch, SetStateAction } from "react";
import { MarkdownPreview } from "../markdown-preview/MarkdownPreview";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faImage } from "@fortawesome/free-solid-svg-icons";
import { FileUploadDialog } from "@/entities/file";

interface MarkdownEditorProps {
  value?: string;
  onChange: Dispatch<SetStateAction<string | undefined>>;
  className?: string;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { value, onChange, className } = props;

  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (e: any) => {
    // Stackoverflow code to handle tabs in textarea

    if (!textAreaRef.current) {
      return;
    }

    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const value = textAreaRef.current.value;
      const selectionStart = textAreaRef.current.selectionStart;
      const selectionEnd = textAreaRef.current.selectionEnd;
      textAreaRef.current.value =
        value.substring(0, selectionStart) +
        "  " +
        value.substring(selectionEnd);
      textAreaRef.current!.selectionStart =
        selectionEnd + 2 - (selectionEnd - selectionStart);
      textAreaRef.current!.selectionEnd =
        selectionEnd + 2 - (selectionEnd - selectionStart);
      onChange(textAreaRef.current!.value);
    }
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      const value = textAreaRef.current.value;
      const selectionStart = textAreaRef.current.selectionStart;
      const selectionEnd = textAreaRef.current.selectionEnd;

      const beforeStart = value
        .substring(0, selectionStart)
        .split("")
        .reverse()
        .join("");
      const indexOfTab = beforeStart.indexOf("  ");
      const indexOfNewline = beforeStart.indexOf("\n");

      if (indexOfTab !== -1 && indexOfTab < indexOfNewline) {
        textAreaRef.current.value =
          beforeStart
            .substring(indexOfTab + 2)
            .split("")
            .reverse()
            .join("") +
          beforeStart.substring(0, indexOfTab).split("").reverse().join("") +
          value.substring(selectionEnd);
        onChange(textAreaRef.current.value);

        textAreaRef.current.selectionStart = selectionStart - 2;
        textAreaRef.current.selectionEnd = selectionEnd - 2;
      }
    }
  };

  const insertText = (textToInsert: string) => {
    if (!textAreaRef.current) {
      return;
    }

    const cursorPosition = textAreaRef.current.selectionStart;

    // Split the current text into two parts at the cursor position
    const textBeforeCursor = value?.substring(0, cursorPosition) ?? "";
    const textAfterCursor = value?.substring(cursorPosition) ?? "";

    const newText = textBeforeCursor + textToInsert + textAfterCursor;

    onChange(newText);

    const newCursorPosition = cursorPosition + textToInsert.length;
    textAreaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  const onImageUploaded = (value: string) => {
    insertText(`![image](${value})`);
  };

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <div>
          <FileUploadDialog
            trigger={
              <Button type="button" size="sm" variant="secondary">
                <FontAwesomeIcon icon={faImage} />
              </Button>
            }
            onUploaded={onImageUploaded}
          />
        </div>
        <div>
          <Button
            type="button"
            className="mr-1"
            size="sm"
            variant={isEdit ? "secondary" : "ghost"}
            onClick={() => setIsEdit((prev) => !prev)}
          >
            <FontAwesomeIcon className="mr-1" icon={faEdit} />
            <span>Edit</span>
          </Button>
          <Button
            type="button"
            size="sm"
            variant={isPreview ? "secondary" : "ghost"}
            onClick={() => setIsPreview((prev) => !prev)}
          >
            <FontAwesomeIcon className="mr-1" icon={faEye} />
            <span>Preview</span>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "grid-cols-[1fr_auto_1fr] border-border p-2 border rounded-md min-h-96 gap-x-1",
          { grid: isEdit && isPreview },
          className
        )}
      >
        <div className={cn("h-96", { hidden: !isEdit })}>
          <textarea
            ref={textAreaRef}
            className="border-0 outline-none w-full h-full resize-none p-2"
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div
          className={cn("h-full w-[1px] bg-border", {
            hidden: !(isEdit && isPreview),
          })}
        />
        <div className={cn("h-96 overflow-auto p-2", { hidden: !isPreview })}>
          <MarkdownPreview value={value ?? ""} />
        </div>
      </div>
    </div>
  );
}

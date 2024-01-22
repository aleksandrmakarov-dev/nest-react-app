"use client";
import { useUploadFile } from "@/components/features/file";
import {
  DialogBase,
  FieldController,
  FormController,
} from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const fileUploadSchema = z.object({
  file: z.custom<File>((file) => file instanceof File),
});

export type FileUploadDto = z.infer<typeof fileUploadSchema>;

interface FileUploadBodyProps {
  trigger: JSX.Element;
  onUploaded: (value: any) => void;
}

export function FileUploadDialog(props: FileUploadBodyProps) {
  const { trigger, onUploaded } = props;

  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending, isError, error } = useUploadFile();

  const form = useForm<FileUploadDto>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File) => void
  ) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files.item(0);
      if (file) {
        onChange(file);
      }
    }
  };

  const onSubmit = (value: FileUploadDto) => {
    mutate(value.file, {
      onSuccess: (data) => {
        onUploaded(data);
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <DialogBase
      open={open}
      setOpen={setOpen}
      title="Upload file"
      description="Select file and click upload to upload file to cloud"
      trigger={trigger}
      isError={isError}
      error={error?.response?.data.message}
    >
      <FormController form={form} submit={onSubmit}>
        <FieldController
          className="mb-3"
          control={form.control}
          name="file"
          render={({ field }) => (
            <Input
              type="file"
              onChange={(e) => onFileChange(e, field.onChange)}
            />
          )}
        />
        <div className="flex justify-end w-full">
          <LoadingButton loading={isPending} variant="default" type="submit">
            Upload
          </LoadingButton>
        </div>
      </FormController>
    </DialogBase>
  );
}

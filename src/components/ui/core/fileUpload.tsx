/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  onFilesChange: (files: File[]) => void;
  className?: string;
}

export default function FileUpload({
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "image/jpeg": [],
    "image/png": [],
    "image/webp": [],
  },
  onFilesChange,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejectionReasons = rejectedFiles[0].errors
          .map((e: any) => e.message)
          .join(", ");
        setError(`File upload failed: ${rejectionReasons}`);
        return;
      }

      // Check if adding these files would exceed the max files limit
      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files`);
        return;
      }

      setError(null);

      // Create previews for images
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      // Update files and previews
      const updatedFiles = [...files, ...acceptedFiles];
      const updatedPreviews = [...previews, ...newPreviews];

      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onFilesChange(updatedFiles);
    },
    [files, previews, maxFiles, onFilesChange]
  );

  const removeFile = (index: number) => {
    // Create new arrays without the file at the specified index
    const newFiles = [...files];
    const newPreviews = [...previews];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    // Remove the file and preview
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    // Update state
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20 hover:border-primary/50",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} disabled={files.length >= maxFiles} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">
            {isDragActive
              ? "Drop the files here"
              : files.length >= maxFiles
              ? `Maximum ${maxFiles} files reached`
              : `Drag & drop files here, or click to select`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {`Upload up to ${maxFiles} images (max ${
              maxSize / (1024 * 1024)
            }MB each)`}
          </p>
        </div>
      </div>

      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-md overflow-hidden border bg-muted"
            >
              <Image
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                {files[index].name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

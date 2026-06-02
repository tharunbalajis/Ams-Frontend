import * as React from 'react';
import { cn } from '../../styles/theme';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesSelected?: (files: File[]) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, accept, multiple, maxSize, onFilesSelected, disabled, error, children }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
      if (!files) return;
      const arr = Array.from(files);
      onFilesSelected?.(maxSize ? arr.filter((f) => f.size <= maxSize) : arr);
    };

    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-center rounded-md border-2 border-dashed border-input bg-background p-6 text-center transition-colors',
          isDragging && 'border-primary bg-primary/5',
          error && 'border-destructive',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary hover:bg-accent/50',
          className,
        )}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (!disabled) handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={(el) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
        {children ?? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm">
              <span className="font-medium text-primary">Click to upload</span> or drag and drop
            </p>
            {maxSize && <p className="text-xs">Max {(maxSize / 1024 / 1024).toFixed(0)} MB</p>}
          </div>
        )}
      </div>
    );
  },
);
FileUpload.displayName = 'FileUpload';

export { FileUpload };

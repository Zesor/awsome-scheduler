import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  hideHeader = false,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Render inside parent container (absolute positioning) instead of portal to document.body
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={overlayRef}
        className="absolute inset-0"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative bg-background dark:bg-slate-950 rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[70vh] sm:max-h-[75vh] animate-in zoom-in-95 duration-200 border border-border dark:border-slate-800",
          className
        )}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-slate-800 shrink-0">
            <h3 className="text-lg font-semibold text-foreground dark:text-slate-100">
              {title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        )}
        <div className={cn("overflow-y-auto flex-1", !hideHeader && "p-6")}>
          {children}
        </div>
      </div>
    </div>
  );
};

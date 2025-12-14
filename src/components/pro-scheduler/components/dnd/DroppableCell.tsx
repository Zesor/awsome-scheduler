import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../utils';

interface DroppableCellProps {
  id: string; // usually ISO date string
  date: Date;
  resourceId?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const DroppableCell: React.FC<DroppableCellProps> = ({ id, date, resourceId, children, className, style, onClick }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { date, resourceId },
  });

  // Determine quarter based on minutes for graduated coloring
  const minutes = date.getMinutes();
  const quarterClass = 
    minutes === 0 ? "hover:bg-blue-50/50 dark:hover:bg-blue-900/10" :
    minutes === 15 ? "hover:bg-blue-50/80 dark:hover:bg-blue-900/20" :
    minutes === 30 ? "hover:bg-blue-100/50 dark:hover:bg-blue-900/30" :
    "hover:bg-blue-100/80 dark:hover:bg-blue-900/40";

  const activeQuarterClass = 
    minutes === 0 ? "bg-blue-50/50 dark:bg-blue-900/10 ring-2 ring-primary ring-inset" :
    minutes === 15 ? "bg-blue-50/80 dark:bg-blue-900/20 ring-2 ring-primary ring-inset" :
    minutes === 30 ? "bg-blue-100/50 dark:bg-blue-900/30 ring-2 ring-primary ring-inset" :
    "bg-blue-100/80 dark:bg-blue-900/40 ring-2 ring-primary ring-inset";

  return (
    <div
      ref={setNodeRef}
      className={cn(
        className,
        quarterClass,
        isOver && activeQuarterClass
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

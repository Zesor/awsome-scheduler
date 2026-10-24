"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Scheduler } from "calendarkit-pro";
import type { CalendarProps } from "calendarkit-pro";
import { demoEvents, DEMO_CALENDARS } from "@/lib/demo";

class Boundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type Props = Omit<CalendarProps, "mode"> & {
  height: number;
  fallback: string;
  lazy?: boolean;
  width?: number;
  minWidth?: number;
};

export function LiveScheduler({
  height,
  fallback,
  lazy,
  width,
  minWidth,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!lazy);
  const [events] = useState(() => demoEvents());
  useEffect(() => {
    if (visible || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible]);
  const img = (
    <img
      src={fallback}
      alt="CalendarKit Pro calendar"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top left",
      }}
    />
  );
  return (
    <div
      ref={ref}
      style={{
        height,
        width,
        maxWidth: "100%",
        margin: width ? "0 auto" : undefined,
        overflowX: "auto",
      }}
    >
      <div style={{ height: "100%", minWidth }}>
        {visible ? (
          <Boundary fallback={img}>
            {/* No `mode`: the library turns dark under a `.dark` ancestor, which next-themes sets on <html> before paint, so server and client HTML match. */}
            <Scheduler
              defaultEvents={events}
              calendars={DEMO_CALENDARS}
              {...props}
            />
          </Boundary>
        ) : (
          img
        )}
      </div>
    </div>
  );
}

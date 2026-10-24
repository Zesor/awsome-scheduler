"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { CalendarProps } from "calendarkit-pro";
import { demoEvents, DEMO_CALENDARS } from "@/lib/demo";

// The library is ~370 KB: fetch it only when the calendar mounts. `onReady` fires once it has rendered.
const Cal = dynamic(
  () =>
    import("calendarkit-pro").then(({ Scheduler, photonPlaces }) => {
      // Location suggestions from OpenStreetMap (Photon, no key), created once.
      const placeSearch = photonPlaces({ lang: "en" });
      return function Cal({ onReady, ...p }: CalendarProps & { onReady: () => void }) {
        useEffect(onReady, [onReady]);
        return <Scheduler placeSearch={placeSearch} {...p} />;
      };
    }),
  { ssr: false },
);

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
  priority?: boolean;
  width?: number;
  minWidth?: number;
};

export function LiveScheduler({
  height,
  fallback,
  lazy,
  priority,
  width,
  minWidth,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!lazy);
  const [ready, setReady] = useState(false);
  const [events] = useState(() => demoEvents());
  // The demo holds what the calendar leaves to its host: calendar toggles and the side panel's time zone.
  const [calendars, setCalendars] = useState(DEMO_CALENDARS);
  const [timezone, setTimezone] = useState<string>();
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
    <Image
      src={fallback}
      alt="CalendarKit Pro calendar"
      width={2556}
      height={1596}
      priority={priority}
      sizes="(min-width: 1200px) 1200px, 100vw"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", borderRadius: 15 }}
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
        overflowX: minWidth ? "auto" : undefined,
      }}
    >
      <div style={{ height: "100%", minWidth, position: "relative" }}>
        {visible && (
          <Boundary fallback={null}>
            {/* No `mode`: the library turns dark under a `.dark` ancestor, which next-themes sets on <html> before paint, so server and client HTML match. */}
            <Cal
              onReady={() => setReady(true)}
              defaultEvents={events}
              calendars={calendars}
              onCalendarToggle={(id: string, active: boolean) => setCalendars((list) => list.map((c) => (c.id === id ? { ...c, active } : c)))}
              {...props}
              // after the spread: callers pass `timezone={undefined}` when their example does not set one
              timezone={props.timezone ?? timezone}
              onTimezoneChange={(tz: string) => { setTimezone(tz); props.onTimezoneChange?.(tz) }}
            />
          </Boundary>
        )}
        {!ready && <div style={visible ? { position: "absolute", inset: 0 } : { height: "100%" }}>{img}</div>}
      </div>
    </div>
  );
}

import type { TimelineEvent as TimelineEventData } from "@/data/timeline";

import styles from "./SpaceTimeline.module.css";

interface TimelineProgressProps {
  activeIndex: number;
  events: TimelineEventData[];
}

export function TimelineProgress({ activeIndex, events }: TimelineProgressProps) {
  const firstYear = events[0]?.year ?? "1956";
  const lastYear = events.at(-1)?.year ?? "2030";
  const progress = events.length > 1 ? activeIndex / (events.length - 1) : 0;

  return (
    <aside
      className={styles.progress}
      aria-label="问天之路年份进度"
      style={{ "--timeline-active-progress": progress } as React.CSSProperties}
    >
      <span>{firstYear}</span>
      <span className={styles.progressLine} aria-hidden="true">
        <span />
      </span>
      <span>{lastYear}</span>
    </aside>
  );
}

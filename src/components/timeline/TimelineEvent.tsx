import type { TimelineEvent as TimelineEventData } from "@/data/timeline";

import styles from "./SpaceTimeline.module.css";

interface TimelineEventProps {
  event: TimelineEventData;
  index: number;
  isActive: boolean;
  isEmphasized: boolean;
}

export function TimelineEvent({ event, index, isActive, isEmphasized }: TimelineEventProps) {
  return (
    <article
      className={styles.event}
      data-timeline-event
      data-active={isActive}
      data-emphasis={isEmphasized}
      style={{ "--event-index": index } as React.CSSProperties}
    >
      <div className={styles.eventMarker} aria-hidden="true" />
      <div className={styles.eventCopy}>
        <span className={styles.eventYear} data-event-year>
          {event.year}
        </span>
        <h3 className={styles.eventTitle} data-event-title>
          {event.title}
        </h3>
        <p className={styles.eventDescription} data-event-description>
          {event.description}
        </p>
        <p className={styles.eventEnglish} data-event-description>
          {event.titleEn}
        </p>
      </div>
    </article>
  );
}

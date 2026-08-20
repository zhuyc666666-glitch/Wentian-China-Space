import type { TimelineEvent as TimelineEventData } from "@/data/timeline";

import styles from "./SpaceTimeline.module.css";

interface TimelineBackgroundProps {
  activeEvent: TimelineEventData;
  phase: string;
}

export function TimelineBackground({ activeEvent, phase }: TimelineBackgroundProps) {
  return (
    <div className={styles.background} data-phase={phase} aria-hidden="true">
      <div className={styles.starVeil} data-timeline-visual />
      <div className={styles.earthAura} data-timeline-visual />
      <div className={styles.moonDisc} data-timeline-visual />
      <div className={styles.marsHaze} data-timeline-visual />
      <div className={styles.deepSpace} data-timeline-visual />

      <svg className={styles.orbitalSketch} viewBox="0 0 900 520" role="img">
        <path d="M78 360 C 220 208, 418 190, 612 248 S 826 226, 882 118" />
        <path d="M138 404 C 306 276, 470 276, 704 332" />
      </svg>

      <svg className={styles.capsuleSketch} viewBox="0 0 180 120" role="img">
        <path d="M72 21 C 104 18, 132 36, 145 62 C 124 86, 94 96, 58 89 C 42 66, 47 37, 72 21Z" />
        <path d="M54 86 L 32 106 M116 82 L143 101 M71 45 C88 37, 106 42, 117 56" />
      </svg>

      <svg className={styles.stationSketch} viewBox="0 0 320 180" role="img">
        <path d="M118 86 H202 M160 45 V132 M79 66 H118 M202 66 H241 M79 108 H118 M202 108 H241" />
        <path d="M130 62 H190 V111 H130Z M52 51 H79 V123 H52Z M241 51 H268 V123 H241Z" />
      </svg>

      <span className={styles.phaseLabel}>{activeEvent.titleEn}</span>
    </div>
  );
}

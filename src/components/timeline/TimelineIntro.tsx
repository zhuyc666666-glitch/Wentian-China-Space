import { timelineEvents } from "@/data/timeline";

import styles from "./TimelineIntro.module.css";

export function TimelineIntro() {
  const originEvent = timelineEvents.find((event) => event.year === "1956");
  const originYear = originEvent?.year ?? "1956";

  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.year}>{originYear}</span>
          <p className={styles.label}>WENTIAN ROAD</p>
          <h2 id="timeline-title" className={styles.title}>
            问天之路
          </h2>
          <p className={styles.text}>从这里开始。中国航天事业踏上问天之路。</p>
        </div>
      </div>
    </section>
  );
}

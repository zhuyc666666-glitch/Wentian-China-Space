import Link from "next/link";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={styles.hero} aria-label="问天首页首屏">
      <div className={styles.spacefield} />
      <div className={styles.farStars} />
      <div className={styles.nearStars} />
      <div className={styles.orbitalLine} />
      <div className={styles.earthGlow} />
      <div className={styles.earth} />

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.kicker}>WENTIAN CHINA SPACE</p>
          <h1>
            <span className={styles.titleLead}>七秩问天路</span>
            <span className={styles.titleMain}>问 天</span>
            <span className={styles.titleEnglish}>WENTIAN</span>
          </h1>
          <p className={styles.subtitle}>从东方红一号，到星辰大海</p>
          <Link className={styles.cta} href="/#timeline">
            开始探索 <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}

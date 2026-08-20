"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

import { timelineEvents } from "@/data/timeline";

import styles from "./SpaceTimeline.module.css";
import { TimelineBackground } from "./TimelineBackground";
import { TimelineEvent } from "./TimelineEvent";
import { TimelineProgress } from "./TimelineProgress";

gsap.registerPlugin(ScrollTrigger);

const emphasizedTitles = new Set([
  "东方红一号",
  "神舟五号",
  "嫦娥一号",
  "嫦娥五号月球采样返回",
  "天问一号 / 祝融号火星探测",
  "中国空间站完成“T”字基本构型",
  "嫦娥六号月球背面采样返回",
  "中国航天事业创建70周年",
  "中国计划实现载人登月",
]);

function getPhase(eventYear: string) {
  if (eventYear === "2030年前") {
    return "future";
  }

  const year = Number.parseInt(eventYear, 10);

  if (year >= 2026) {
    return "anniversary";
  }

  if (year >= 2022) {
    return "station";
  }

  if (year >= 2021) {
    return "mars";
  }

  if (year >= 2007) {
    return "lunar";
  }

  if (year >= 2003) {
    return "crewed";
  }

  return "earth";
}

export function SpaceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = timelineEvents[activeIndex] ?? timelineEvents[0];
  const phase = getPhase(activeEvent.year);
  const journeyEvents = useMemo(() => timelineEvents.slice(1), []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = gsap.utils.selector(section);
    const eventCards = selector("[data-timeline-event]");
    const introItems = selector("[data-timeline-intro] > *");

    if (reduceMotion) {
      gsap.set([...introItems, ...eventCards], { autoAlpha: 1, clearProps: "filter,transform" });
      section.style.setProperty("--trail-progress", "1");
      return;
    }

    const context = gsap.context(() => {
      gsap.set(introItems, { autoAlpha: 0, y: 24, filter: "blur(10px)" });
      gsap.set(eventCards, { autoAlpha: 0.34 });
      gsap.set(selector("[data-event-year], [data-event-title], [data-event-description]"), {
        autoAlpha: 0,
        y: 22,
        filter: "blur(10px)",
      });

      gsap.to(introItems, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: selector("[data-timeline-intro]")[0],
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(section, {
        "--trail-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
        },
      });

      gsap.to(selector("[data-timeline-visual]"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      eventCards.forEach((card, index) => {
        const timelineIndex = index + 1;
        const cardSelector = gsap.utils.selector(card);

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 72%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveIndex(timelineIndex),
            onEnterBack: () => setActiveIndex(timelineIndex),
          },
        })
          .to(card, {
            autoAlpha: 1,
            duration: 0.72,
            ease: "power2.out",
          })
          .to(
            cardSelector("[data-event-year]"),
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.72,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            cardSelector("[data-event-title]"),
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.82,
              ease: "power2.out",
            },
            "-=0.46",
          )
          .to(
            cardSelector("[data-event-description]"),
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.78,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.38",
          );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom bottom",
        onEnter: () => setActiveIndex(0),
        onEnterBack: () => setActiveIndex(0),
      });

      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className={styles.section}
      data-phase={phase}
      aria-labelledby="timeline-title"
    >
      <TimelineBackground activeEvent={activeEvent} phase={phase} />
      <TimelineProgress activeIndex={activeIndex} events={timelineEvents} />

      <div className={styles.intro}>
        <div className={styles.introCopy} data-timeline-intro>
          <span className={styles.introYear}>{timelineEvents[0]?.year}</span>
          <h2 id="timeline-title" className={styles.introTitle}>
            问天之路
            <span>ROAD TO THE STARS</span>
          </h2>
          <p>从这里开始。</p>
          <p>中国航天事业踏上问天之路。</p>
          <span className={styles.introMeta}>70 YEARS OF EXPLORATION</span>
        </div>
      </div>

      <div className={styles.journey}>
        <div className={styles.trajectory} aria-hidden="true">
          <svg viewBox="0 0 1200 1500" preserveAspectRatio="none">
            <path
              className={styles.trajectoryBase}
              d="M190 90 C 1040 240, 180 380, 848 560 C 1130 636, 1008 860, 442 850 C 144 846, 210 1110, 720 1160 C 1060 1194, 980 1358, 612 1450"
            />
            <path
              className={styles.trajectoryActive}
              pathLength="1"
              d="M190 90 C 1040 240, 180 380, 848 560 C 1130 636, 1008 860, 442 850 C 144 846, 210 1110, 720 1160 C 1060 1194, 980 1358, 612 1450"
            />
          </svg>
        </div>

        <div className={styles.events}>
          {journeyEvents.map((event, index) => (
            <TimelineEvent
              key={`${event.year}-${event.title}`}
              event={event}
              index={index}
              isActive={timelineEvents[activeIndex]?.title === event.title}
              isEmphasized={emphasizedTitles.has(event.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

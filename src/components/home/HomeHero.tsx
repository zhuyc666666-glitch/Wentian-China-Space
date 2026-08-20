"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EarthScene } from "./EarthScene";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = gsap.utils.selector(hero);
    const starLayers = selector("[data-star-layer]");
    const earthStage = selector("[data-earth-stage]");
    const revealItems = selector("[data-hero-reveal]");
    const scrollCue = selector("[data-scroll-cue]");

    if (reduceMotion) {
      gsap.set([...starLayers, ...earthStage, ...revealItems, ...scrollCue], {
        autoAlpha: 1,
        clearProps: "filter,transform",
      });
      hero.dataset.animated = "true";
      return;
    }

    const context = gsap.context(() => {
      gsap.set(starLayers, { autoAlpha: 0 });
      gsap.set(earthStage, { autoAlpha: 0, y: 96, filter: "blur(10px)" });
      gsap.set(revealItems, { autoAlpha: 0, y: 22, filter: "blur(12px)" });
      gsap.set(scrollCue, { autoAlpha: 0, y: 12 });

      hero.dataset.animated = "true";

      const timeline = gsap.timeline({
        defaults: {
          duration: 1.15,
          ease: "power2.out",
        },
      });

      timeline
        .to(starLayers, {
          autoAlpha: 1,
          duration: 1.8,
          stagger: 0.28,
        })
        .to(
          earthStage,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 2.15,
            ease: "power2.out",
          },
          "-=1.05",
        )
        .to(revealItems, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.18,
        }, "-=1.1")
        .to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.25");

      const handlePointerMove = (event: PointerEvent) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(selector("[data-star-layer='far']"), {
          x: x * 4,
          y: y * 3,
          duration: 1.6,
          ease: "power2.out",
        });
        gsap.to(selector("[data-star-layer='main']"), {
          x: x * 7,
          y: y * 5,
          duration: 1.6,
          ease: "power2.out",
        });
        gsap.to(selector("[data-star-layer='near']"), {
          x: x * 10,
          y: y * 7,
          duration: 1.6,
          ease: "power2.out",
        });
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        timeline.kill();
      };
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} data-animated="false" aria-label="问天首页首屏">
      <div className={styles.spacefield} data-star-layer="main" />
      <div className={styles.farStars} data-star-layer="far" />
      <div className={styles.nearStars} data-star-layer="near" />
      <div className={styles.orbitalLine} />
      <div className={styles.earthStage} data-earth-stage>
        <EarthScene />
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <h1>
            <span className={styles.titleLead} data-hero-reveal>
              七秩问天路
            </span>
            <span className={styles.titleMain} data-hero-reveal>
              问 天
            </span>
            <span className={styles.titleEnglish} data-hero-reveal>
              WENTIAN
            </span>
          </h1>
          <p className={styles.subtitle} data-hero-reveal>
            从东方红一号，到星辰大海
          </p>
          <Link className={styles.cta} href="/#timeline" data-hero-reveal>
            开始探索 <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>

      <div className={styles.scrollCue} data-scroll-cue aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}

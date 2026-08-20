"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { EarthScene } from "./EarthScene";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const isExploringRef = useRef(false);

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

  const handleExplore = () => {
    const hero = heroRef.current;
    const target = document.querySelector<HTMLElement>("#timeline");

    if (!hero || !target || isExploringRef.current) {
      return;
    }

    isExploringRef.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      isExploringRef.current = false;
      return;
    }

    const selector = gsap.utils.selector(hero);
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const scrollState = { y: startY };

    const timeline = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      onComplete: () => {
        isExploringRef.current = false;
      },
    });

    timeline
      .to(selector("[data-explore-button]"), {
        autoAlpha: 0,
        y: -10,
        duration: 0.45,
      })
      .to(
        selector("[data-hero-heading], [data-hero-subtitle]"),
        {
          y: -48,
          filter: "blur(1px)",
          duration: 1.25,
        },
        "<",
      )
      .to(
        selector("[data-star-layer]"),
        {
          scale: 1.06,
          y: -28,
          opacity: 0.92,
          duration: 1.45,
          stagger: 0.04,
        },
        "<",
      )
      .to(
        selector("[data-earth-stage]"),
        {
          scale: 1.08,
          y: -42,
          duration: 1.55,
        },
        "<0.1",
      )
      .to(
        selector("[data-scroll-cue]"),
        {
          autoAlpha: 0,
          y: 12,
          duration: 0.55,
        },
        "<",
      )
      .to(scrollState, {
        y: targetY,
        duration: 1.35,
        ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, scrollState.y),
      }, "-=0.45");
  };

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
          <h1 data-hero-heading>
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
          <p className={styles.subtitle} data-hero-reveal data-hero-subtitle>
            从东方红一号，到星辰大海
          </p>
          <button
            type="button"
            className={styles.cta}
            onClick={handleExplore}
            data-hero-reveal
            data-explore-button
          >
            开始探索 <span aria-hidden="true">-&gt;</span>
          </button>
        </div>
      </div>

      <div className={styles.scrollCue} data-scroll-cue aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/asset-path";
import styles from "@/app/page.module.css";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reducedMotion.matches || !finePointer.matches) return;

    let frame: number | null = null;
    let pointerX = 0.72;
    let pointerY = 0.32;

    const renderPointer = () => {
      hero.style.setProperty("--pointer-x", `${(pointerX * 100).toFixed(2)}%`);
      hero.style.setProperty("--pointer-y", `${(pointerY * 100).toFixed(2)}%`);
      hero.style.setProperty("--hero-x", `${((pointerX - 0.5) * 18).toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${((pointerY - 0.5) * 12).toFixed(2)}px`);
      frame = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = frameRef.current?.getBoundingClientRect() ?? hero.getBoundingClientRect();
      pointerX = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
      pointerY = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);
      hero.dataset.pointerActive = "true";
      if (frame === null) frame = window.requestAnimationFrame(renderPointer);
    };

    const handlePointerLeave = () => {
      delete hero.dataset.pointerActive;
      hero.style.setProperty("--hero-x", "0px");
      hero.style.setProperty("--hero-y", "0px");
    };

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="profile" aria-labelledby="hero-title">
      <div ref={frameRef} className={styles.heroFrame}>
      <div className={styles.heroAtmosphere} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.pointerLight} aria-hidden="true" />
      <div className={styles.heroPortrait} aria-hidden="true">
        <Image src={assetPath("/assets/song-jeongeun-portrait.webp")} alt="" fill priority sizes="(max-width: 1024px) 105vw, (max-width: 1920px) 60vw, 960px" />
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}><span>01</span> Profile</p>
        <h1 id="hero-title"><span>Sound</span><span>with Intent</span></h1>
        <p>장면과 플레이에 무엇을 더하고 덜어낼지 판단해,<br />연출의 의도를 선명하게 전하고 재미와 감동을 이끌어냅니다.</p>
      </div>
      <div className={styles.heroCredit}>
        <span>Sound Designer</span><strong>송정은</strong><small>Jeongeun Song</small>
      </div>
      <a className={styles.scrollCue} href="#career"><span>Scroll to enter</span><i aria-hidden="true" /></a>
      </div>
    </section>
  );
}
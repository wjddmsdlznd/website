"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { credits } from "@/content/portfolio";
import { assetPath } from "@/lib/asset-path";
import styles from "@/app/page.module.css";

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startTime: number;
  dragging: boolean;
};

function CreditList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className={styles.creditGroup} aria-hidden={duplicate || undefined}>
      {credits.map((credit) => (
        <li className={styles.creditCard} key={`${duplicate ? "copy-" : ""}${credit.title}`}>
          <article>
            <div className={`${styles.creditPoster} ${credit.contain ? styles.creditPosterContain : ""}`} style={{ background: credit.background }}>
              <Image src={assetPath(credit.image)} alt="" fill sizes="190px" />
            </div>
            <div className={styles.creditMeta}>
              <small>{credit.meta}</small>
              <h3>{credit.title}</h3>
              <p><span>담당 역할</span>{credit.role}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function FilmographySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function getAnimationMetrics() {
    const track = trackRef.current;
    const animation = track?.getAnimations()[0];
    if (!track || !animation) return null;

    const duration = Number(animation.effect?.getTiming().duration);
    const currentTime = Number(animation.currentTime ?? 0);
    const shift = Number.parseFloat(getComputedStyle(track).getPropertyValue("--shift")) || 0;
    const cycleWidth = track.scrollWidth / 2 + shift;
    if (!Number.isFinite(duration) || duration <= 0 || cycleWidth <= 0) return null;

    return { animation, currentTime, cycleWidth, duration, track };
  }

  function wrapTime(time: number, duration: number) {
    return ((time % duration) + duration) % duration;
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    trackRef.current?.style.removeProperty("animation-play-state");
    dragRef.current = null;
    setIsDragging(false);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const metrics = getAnimationMetrics();
    if (!metrics) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: metrics.currentTime,
      dragging: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.dragging) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 6) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        endDrag(event);
        return;
      }
      drag.dragging = true;
      trackRef.current?.style.setProperty("animation-play-state", "paused");
      setIsDragging(true);
    }

    const metrics = getAnimationMetrics();
    if (!metrics) return;
    event.preventDefault();
    metrics.animation.currentTime = wrapTime(
      drag.startTime - (deltaX / metrics.cycleWidth) * metrics.duration,
      metrics.duration,
    );
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const metrics = getAnimationMetrics();
    if (!metrics) return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    metrics.animation.currentTime = wrapTime(
      metrics.currentTime + direction * metrics.duration * 0.04,
      metrics.duration,
    );
  }

  return (
    <section className={styles.creditsSection} id="credits" aria-labelledby="credits-title">
      <header className={styles.sectionHeader}>
        <div>
          <p className={styles.kicker}><span>04</span> Filmography</p>
          <h2 id="credits-title">참여한 작품과 <em>맡은 역할.</em></h2>
        </div>
        <div className={styles.count}><strong>40+</strong><span>Commercial<br />Projects</span></div>
      </header>
      <p className={styles.srOnly} id="credits-motion-note">우측에서 좌측으로 흐르는 참여작 목록입니다. 누른 채 좌우로 드래그하거나 좌우 화살표 키로 작품을 탐색할 수 있습니다.</p>
      <div
        className={styles.creditMarquee}
        tabIndex={0}
        aria-describedby="credits-motion-note"
        data-dragging={isDragging || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={handleKeyDown}
        onDragStart={(event) => event.preventDefault()}
      >
        <div ref={trackRef} className={styles.creditTrack}>
          <CreditList />
          <CreditList duplicate />
        </div>
      </div>
    </section>
  );
}

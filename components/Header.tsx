"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";

const navigation = [
  ["profile", "Profile"],
  ["career", "Career Scene"],
  ["work", "Sound Portfolio"],
  ["credits", "Filmography"],
  ["contact", "Contact"],
] as const;

type NavigationId = (typeof navigation)[number][0];

export function Header() {
  const [activeId, setActiveId] = useState<NavigationId>("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeIndex = navigation.findIndex(([id]) => id === activeId);
  const activeLabel = navigation[activeIndex]?.[1] ?? navigation[0][1];

  useEffect(() => {
    const sections = navigation
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const contactSection = sections.at(-1);
      if (
        contactSection
        && contactSection.getBoundingClientRect().top <= window.innerHeight * 0.65
      ) {
        setActiveId("contact");
        return;
      }

      const activationLine = window.innerHeight * 0.3;
      let nextActive = sections[0]?.id as NavigationId | undefined;
      sections.slice(0, -1).forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          nextActive = section.id as NavigationId;
        }
      });
      if (nextActive) setActiveId(nextActive);
    };
    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className={styles.header}>
      <button
        ref={menuButtonRef}
        type="button"
        className={styles.mobileNavToggle}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className={styles.mobileNavCurrent}><b>{String(activeIndex + 1).padStart(2, "0")}</b>{activeLabel}</span>
        <span className={styles.mobileNavAction}>Menu <i aria-hidden="true" /></span>
      </button>
      <nav id="primary-navigation" className={isMenuOpen ? styles.navOpen : undefined} aria-label="주요 메뉴">
        {navigation.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={activeId === id ? "location" : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.navIndex}>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

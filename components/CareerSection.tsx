"use client";

import Image from "next/image";
import { useState } from "react";
import { capabilities, careers } from "@/content/portfolio";
import { assetPath } from "@/lib/asset-path";
import styles from "@/app/page.module.css";

export function CareerSection() {
  const [selectedId, setSelectedId] = useState(careers[0].id);
  const selected = careers.find((career) => career.id === selectedId) ?? careers[0];

  return (
    <section className={styles.careerSection} id="career" aria-labelledby={`career-title-${selected.id}`}>
      <div className={styles.careerStage} data-career={selected.id} style={{ "--career-accent": selected.accent } as React.CSSProperties}>
        <div className={styles.careerImage} aria-hidden="true">
          <Image src={assetPath("/assets/song-jeongeun-portrait.webp")} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" />
          <span />
        </div>
        <div className={styles.careerCopy}>
          <p className={styles.kicker}><span>02</span> Career Scene</p>
          <div className={styles.careerPanels} aria-live="polite">
            {careers.map((career) => {
              const isSelected = career.id === selected.id;

              return (
                <div
                  key={career.id}
                  className={`${styles.careerContent} ${isSelected ? styles.careerContentActive : ""}`}
                  aria-hidden={!isSelected}
                >
                  <p className={styles.careerPeriod}>{career.period}</p>
                  <h2 id={`career-title-${career.id}`}>{career.company}</h2>
                  <p className={styles.careerRole}>{career.role}</p>
                  <p className={styles.careerDescription}>{career.description}</p>
                  <ul className={styles.careerHighlights}>
                    {career.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className={styles.careerTags}>{career.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.careerSelector} role="group" aria-label="경력 선택">
          {careers.map((career, index) => (
            <button
              key={career.id}
              type="button"
              aria-pressed={career.id === selected.id}
              onClick={() => setSelectedId(career.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{career.tabLabel}</strong>
              <small>{career.tabPeriod}</small>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.capabilities} aria-labelledby="capabilities-title">
        <div className={styles.capabilitiesHeading}>
          <p>Selected expertise</p>
          <h3 id="capabilities-title">Capabilities</h3>
        </div>
        <dl className={styles.capabilityGroups}>
          <div>
            <dt>Core Practice</dt>
            <dd>{capabilities.practice.map((item) => <span key={item}>{item}</span>)}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{capabilities.tools.map((item) => <span key={item}>{item}</span>)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

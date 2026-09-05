"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { projects, type Project } from "@/content/portfolio";
import { assetPath } from "@/lib/asset-path";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import styles from "@/app/page.module.css";

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (!project.thumbnail) {
    return (
      <span className={`${styles.projectVisual} ${styles.pendingVisual}`} aria-hidden="true">
        <span className={styles.pendingWave}>{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</span>
      </span>
    );
  }

  return (
    <span className={styles.projectVisual} aria-hidden="true">
      <Image src={assetPath(project.thumbnail)} alt="" fill sizes={project.featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 33vw, 33vw"} />
      {!compact && <span className={styles.play}>▶</span>}
    </span>
  );
}

export function PortfolioSection() {
  const published = projects.filter((project) => project.youtubeUrl);
  const [mobileSelected, setMobileSelected] = useState(published[0]);
  const [activeProject, setActiveProject] = useState<Project>(published[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      setIsPlaying(false);
      lastTrigger.current?.focus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  function openProject(project: Project, event: MouseEvent<HTMLElement>) {
    if (!project.youtubeUrl) return;
    setActiveProject(project);
    setIsPlaying(true);
    lastTrigger.current = event.currentTarget;
    window.requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  const embedUrl = activeProject.youtubeUrl ? getYouTubeEmbedUrl(activeProject.youtubeUrl) : null;

  return (
    <section className={styles.workSection} id="work" aria-labelledby="work-title">
      <header className={styles.sectionHeader}>
        <div>
          <p className={styles.kicker}><span>03</span> Sound Portfolio</p>
          <h2 id="work-title">사운드 포트폴리오</h2>
        </div>
        <div className={styles.count}><strong>A—Z</strong><span>Full Sound<br />Design</span></div>
      </header>

      <div className={styles.mobileFeature}>
        <p><span>Now Selected</span><small>{mobileSelected.category}</small></p>
        <button type="button" className={styles.mobileStage} onClick={(event) => openProject(mobileSelected, event)} aria-label={`${mobileSelected.title} 재생`}>
          <ProjectVisual project={mobileSelected} />
          <span className={styles.mobileStageInfo}>
            <small>{mobileSelected.category}</small><strong>{mobileSelected.title}</strong><span>{mobileSelected.role}</span>
          </span>
        </button>
      </div>

      <div className={styles.projectGrid} aria-label="사운드 포트폴리오 2개와 제작 중인 포트폴리오 1개">
        {projects.map((project) => {
          if (!project.youtubeUrl) {
            return (
              <article key={project.id} className={`${styles.projectCard} ${styles.pendingCard}`}>
                <ProjectVisual project={project} compact />
                <span className={styles.projectInfo}><small>{project.category}</small><strong>{project.shortTitle}</strong><span>{project.role}</span></span>
              </article>
            );
          }
          const cardClass = project.featured ? styles.featuredCard : styles.secondaryCard;
          return (
            <button
              key={project.id}
              type="button"
              className={`${styles.projectCard} ${cardClass}`}
              aria-label={`${project.title} 재생`}
              aria-current={mobileSelected.id === project.id ? "true" : undefined}
              onClick={(event) => {
                if (window.matchMedia("(max-width: 1024px)").matches) setMobileSelected(project);
                else openProject(project, event);
              }}
            >
              <ProjectVisual project={project} compact={false} />
              <span className={styles.projectInfo}><small>{project.category}</small><strong>{project.shortTitle}</strong><span>{project.role}</span></span>
            </button>
          );
        })}
      </div>

      <dialog ref={dialogRef} className={styles.projectDialog} aria-labelledby="project-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        <div className={styles.dialogLayout}>
          <button className={styles.dialogClose} type="button" onClick={() => dialogRef.current?.close()} aria-label="프로젝트 상세 닫기">닫기 <span>×</span></button>
          <div className={styles.dialogVisual}>
            {isPlaying && embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${activeProject.title} YouTube 영상`}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className={styles.dialogFallback}>
                <p>사이트 내 재생을 준비하지 못했습니다.</p>
                {activeProject.youtubeUrl && <a href={activeProject.youtubeUrl} target="_blank" rel="noreferrer">YouTube에서 영상 보기 ↗</a>}
              </div>
            )}
          </div>
          <div className={styles.dialogInfo}>
            <div className={styles.dialogTitle}>
              <p className={styles.kicker}><span>{activeProject.order}</span> Sound Portfolio</p>
              <h2 id="project-dialog-title">{activeProject.title}</h2>
            </div>
            <div className={styles.dialogMeta}>
              <dl>
                <div><dt>Type</dt><dd>{activeProject.category}</dd></div>
                <div><dt>Scope</dt><dd>{activeProject.role}</dd></div>
              </dl>
              {activeProject.youtubeUrl && <a className={styles.dialogPlay} href={activeProject.youtubeUrl} target="_blank" rel="noreferrer">YouTube에서 열기 <span>↗</span></a>}
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}

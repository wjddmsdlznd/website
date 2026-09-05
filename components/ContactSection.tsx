"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";

const EMAIL = "wjddmsdlznd@naver.com";

export function ContactSection() {
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast("이메일 주소가 복사되었습니다.");
    } catch {
      setToast("복사하지 못했습니다. 이메일 주소를 직접 선택해 주세요.");
    }

    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }

  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <p className={styles.kicker} id="contact-title"><span>05</span> Contact</p>
      <button className={styles.contactMail} type="button" onClick={copyEmail} aria-label={`${EMAIL} 클립보드에 복사`}>
        <strong>송정은</strong>
        <span>Jeongeun Song</span>
        <small>{EMAIL}</small>
        <span className={styles.contactCopyCue} aria-hidden="true">Copy email <i>→</i></span>
      </button>
      <div className={styles.rightsNotice}>
        <span>Rights Notice</span>
        <p>본 사이트에 사용된 작품 이미지 및 관련 저작물의 권리는 각 권리자에게 있습니다.<br />이미지는 참여 이력 확인을 위한 비상업적 포트폴리오 목적으로 사용됩니다.</p>
      </div>
      <a className={styles.backToTop} href="#profile" aria-label="맨 위로 이동">
        <span aria-hidden="true">↑</span>
        <small aria-hidden="true">Top</small>
      </a>
      {toast && <div className={styles.contactToast} role="status" aria-live="polite" aria-atomic="true">{toast}</div>}
    </section>
  );
}
import { CareerSection } from "@/components/CareerSection";
import { ContactSection } from "@/components/ContactSection";
import { FilmographySection } from "@/components/FilmographySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.grain} aria-hidden="true" />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <CareerSection />
        <PortfolioSection />
        <FilmographySection />
        <ContactSection />
      </main>
    </>
  );
}

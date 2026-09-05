export type Career = {
  id: "influential" | "bluecap" | "sounddepot" | "freelance";
  tabLabel: string;
  tabPeriod: string;
  period: string;
  company: string;
  role: string;
  description: string;
  highlights: string[];
  tags: string[];
  accent: string;
};

export type Project = {
  id: string;
  order: string;
  title: string;
  shortTitle: string;
  category: string;
  role: string;
  status: string;
  thumbnail?: string;
  youtubeUrl?: string;
  featured?: boolean;
};

export type Credit = {
  title: string;
  meta: string;
  role: string;
  image: string;
  contain?: boolean;
  background?: string;
};

export const careers: Career[] = [
  {
    id: "influential",
    tabLabel: "INFLUENTIAL",
    tabPeriod: "2022—NOW",
    period: "2022.11 — 현재",
    company: "인플루엔셜 · 윌라",
    role: "콘텐츠팀 사운드 엔지니어",
    description: "오디오북과 오디오드라마의 녹음 디렉팅부터 보이스 편집, 사운드 디자인, 후반 믹스와 품질 검수까지 제작 전 과정을 이끕니다.",
    highlights: [
      "100편 이상의 오디오북·오디오드라마에서 성우 디렉팅, 보이스 편집과 후반 품질 검수를 수행했습니다.",
      "장시간 청취 환경을 고려해 Voice·SFX·BGM의 균형과 장면 전환의 공간감을 설계했습니다.",
      "성우 캐스팅 검토부터 녹음 일정, 편집 공정과 최종 검수까지 제작 커뮤니케이션을 리드했습니다.",
    ],
    tags: ["Direction", "Voice", "Mix · QC"],
    accent: "#b97a4f",
  },
  {
    id: "bluecap",
    tabLabel: "BLUECAP",
    tabPeriod: "2019—2022",
    period: "2019.11 — 2022.03",
    company: "블루캡",
    role: "사운드이펙트팀 사운드 에디터",
    description: "영화와 OTT 시리즈 40편 이상에서 SFX, 앰비언스와 폴리 레코딩을 제작하고, 다중 프로젝트의 사운드 방향과 품질을 조율했습니다.",
    highlights: [
      "작품의 장르와 감정선에 맞춘 SFX·앰비언스 제작으로 장면의 공간감과 서사적 반응을 설계했습니다.",
      "인물의 움직임과 재질을 표현하는 폴리 소스를 녹음하고 프레임 단위로 편집·동기화했습니다.",
      "사운드 이펙트 파트를 리드하며 동시 3~5개 프로젝트의 일정, 리소스와 품질을 관리했습니다.",
    ],
    tags: ["Sound FX", "Ambience", "Foley"],
    accent: "#7b9898",
  },
  {
    id: "sounddepot",
    tabLabel: "SOUND DEPOT",
    tabPeriod: "2016—2017",
    period: "2016.10 — 2017.02",
    company: "사운드디포",
    role: "사운드 에디터",
    description: "EBS 키즈 애니메이션 시리즈의 효과음과 폴리를 편집하며 프레임 단위 모션 싱크와 반복 청취에 적합한 명료한 사운드를 제작했습니다.",
    highlights: [
      "변신, 레이싱, 마법과 타격 등 화면의 동작을 명확하게 전달하는 애니메이션 SFX를 제작했습니다.",
      "캐릭터의 발소리와 움직임, 재질을 표현하는 폴리를 프레임 단위로 정밀하게 동기화했습니다.",
      "유아·아동의 반복 청취를 고려해 자극을 낮추면서도 인지가 분명한 사운드 밸런스를 유지했습니다.",
    ],
    tags: ["Animation", "Sound FX", "Foley"],
    accent: "#8e7488",
  },
  {
    id: "freelance",
    tabLabel: "FREELANCE",
    tabPeriod: "2016—2022",
    period: "2016.01 — 2022.10",
    company: "프리랜서",
    role: "사운드 디렉터 · 에디터",
    description: "단편 영화와 웹드라마의 음향 콘셉트, ADR 녹음, 사운드 디자인, 믹싱과 마스터링을 독립적으로 수행했습니다.",
    highlights: [
      "연출 의도를 바탕으로 작품의 음향 콘셉트와 전체 톤 앤 매너를 수립했습니다.",
      "다이얼로그 정돈, SFX·앰비언스·BGM 배치부터 믹싱과 마스터링까지 전 과정을 수행했습니다.",
      "모바일, 웹과 극장 등 최종 재생 환경에 맞춰 밸런스와 라우드니스를 점검하고 납품했습니다.",
    ],
    tags: ["ADR", "Sound Design", "Mix · Master"],
    accent: "#a18462",
  },
];

export const capabilities = {
  practice: ["Sound Design", "Sound Effects", "Foley", "Ambience", "Voice Direction", "Mix / QC"],
  tools: ["Pro Tools", "Reaper", "Reaper Script Custom", "Soundminer"],
};

export const projects: Project[] = [
  {
    id: "lost-ark-mobile-opening",
    order: "01",
    title: "로스트아크 모바일 VISION PREVIEW — OPENING",
    shortTitle: "로스트아크 모바일 VISION PREVIEW",
    category: "Game Cinematic",
    role: "Full Sound Design",
    status: "Published",
    thumbnail: "/assets/portfolio/lost-ark-mobile-opening.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=e9IbwldVgYk",
    featured: true,
  },
  {
    id: "lost-ark-devil-hunter",
    order: "02",
    title: "로스트아크 클래스 소개 — 데빌헌터",
    shortTitle: "로스트아크 클래스 소개 · 데빌헌터",
    category: "Game Skill",
    role: "Full Sound Design",
    status: "Published",
    thumbnail: "/assets/portfolio/lost-ark-devil-hunter.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=qZvE5qLv4Ms",
  },
  {
    id: "in-production",
    order: "03",
    title: "세 번째 작품 제작 중",
    shortTitle: "세 번째 작품 제작 중",
    category: "New Sound Portfolio",
    role: "Coming Soon",
    status: "In Production",
  },
];

export const credits: Credit[] = [
  { title: "반도", meta: "Film · 2020", role: "Sound Effects", image: "/assets/credits/peninsula.webp" },
  { title: "소리꾼", meta: "Film · 2020", role: "Sound Effects", image: "/assets/credits/sorikkun.webp" },
  { title: "강철비2: 정상회담", meta: "Film · 2020", role: "Sound Effects", image: "/assets/credits/steel-rain-2.webp" },
  { title: "보스턴1947", meta: "Film · 2020", role: "Sound Effects · Ambience", image: "/assets/credits/road-to-boston.webp" },
  { title: "조제", meta: "Film · 2020", role: "Sound Effects", image: "/assets/credits/jos-ee.webp" },
  { title: "3일의 휴가", meta: "Film · 2020", role: "Sound Effects · Ambience", image: "/assets/credits/our-season.webp" },
  { title: "발신제한", meta: "Film · 2020", role: "Sound Effects · Foley Recording", image: "/assets/credits/hard-hit.webp" },
  { title: "빛나는 순간", meta: "Film · 2021", role: "Sound Effects · Ambience", image: "/assets/credits/everglow.webp" },
  { title: "킬링 로맨스", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/killing-romance.webp" },
  { title: "첩종", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/cheopjong.webp" },
  { title: "비상선언", meta: "Film · 2021", role: "Sound Effects · Ambience", image: "/assets/credits/emergency-declaration.webp" },
  { title: "소년들", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/the-boys.webp" },
  { title: "교섭", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/the-point-men.webp" },
  { title: "태일이", meta: "Animation Film · 2021", role: "Sound Effects · Ambience", image: "/assets/credits/chun-tae-il.webp" },
  { title: "찬란한 나의 복수", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/brilliant-revenge.webp" },
  { title: "바이러스", meta: "Film · 2021", role: "Ambience", image: "/assets/credits/virus.webp" },
  { title: "한산", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/hansan.webp" },
  { title: "645", meta: "Film · 2021", role: "Sound Effects", image: "/assets/credits/6-45.webp" },
  { title: "뜨거운 피", meta: "Film · 2022", role: "Sound Effects", image: "/assets/credits/hot-blooded.webp" },
  { title: "일장춘몽", meta: "Film · 2022", role: "Sound Effects", image: "/assets/credits/life-is-but-a-dream.webp" },
  { title: "콘크리트 유토피아", meta: "Film · 2022", role: "Sound Effects", image: "/assets/credits/concrete-utopia.webp" },
  { title: "헤어질 결심", meta: "Film · 2022", role: "Sound Effects", image: "/assets/credits/decision-to-leave.webp" },
  { title: "DOTA2 · 시즌 1–3", meta: "Netflix Animation · 2019", role: "Sound Effects · Ambience", image: "/assets/credits/dota-dragons-blood.webp" },
  { title: "위쳐", meta: "Netflix Animation · 2020", role: "Sound Effects", image: "/assets/credits/the-witcher.webp" },
  { title: "지옥", meta: "Netflix Series · 2021", role: "Sound Effects", image: "/assets/credits/hellbound.webp" },
  { title: "루키즘", meta: "Netflix Animation · 2022", role: "Sound Effects", image: "/assets/credits/lookism.webp" },
  { title: "윌라", meta: "Audio Platform · 2022—Now", role: "Sound Design · Recording", image: "/assets/credits/willa.webp", contain: true, background: "#079a56" },
  { title: "윌라 스토리", meta: "Audio Drama · 2022—Now", role: "Sound Direction · Sound Design · Mix", image: "/assets/credits/willa-story.webp", contain: true, background: "#6b00e8" },
];

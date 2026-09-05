# Sound Designer Portfolio

송정은 사운드 디자이너의 다크 시네마틱 포트폴리오입니다. Next.js App Router, React, TypeScript, CSS Modules로 구현했으며 GitHub Pages용 정적 내보내기를 지원합니다.

## Local development

```powershell
pnpm install
pnpm dev
```

기본 개발 주소는 `http://localhost:3000`입니다.

## Validation

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm build`가 성공하면 GitHub Pages에 올릴 수 있는 정적 결과물이 `out/`에 생성됩니다.

## GitHub Pages base path

저장소 이름을 경로로 사용할 때는 빌드 전에 다음 값을 지정합니다.

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/repository-name"
pnpm build
```

## Project structure

- `app/`: App Router 진입점과 전역 스타일
- `components/`: 화면 섹션과 인터랙션
- `content/`: 경력, 포트폴리오, 필모그래피 데이터
- `public/assets/`: 공개 후보 이미지와 포트폴리오 썸네일
- `design-lab/`: 구현 전 정적 프로토타입 참고본
- `docs/`: PRD, TRD, 결정 기록, 로드맵

포트폴리오 소유자는 현재 공개 콘텐츠를 승인했습니다. 공개 배포 전에는 제3자 포스터 이미지의 사용 근거를 별도로 확정해야 합니다. 자세한 상태는 `docs/DECISIONS.md`의 D-032와 D-033을 확인하세요.

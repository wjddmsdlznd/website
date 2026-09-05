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

저장소 이름을 경로로 사용할 때는 빌드 전에 다음 값을 지정합니다. 현재 배포 경로는 `/website`입니다.

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/website"
pnpm build
```

`main` 브랜치에 푸시하면 GitHub Actions가 타입 검사, 린트, 테스트와 정적 빌드를 실행한 뒤 Pages에 배포합니다.

## Project structure

- `app/`: App Router 진입점과 전역 스타일
- `components/`: 화면 섹션과 인터랙션
- `content/`: 경력, 포트폴리오, 필모그래피 데이터
- `public/assets/`: 공개 후보 이미지와 포트폴리오 썸네일
- `design-lab/`: 구현 전 정적 프로토타입 참고본
- 내부 설계 문서와 강의 제작 폴더는 공개 저장소에서 제외됩니다.

포트폴리오 소유자는 현재 공개 콘텐츠를 승인했습니다. 제3자 포스터 이미지는 참여 이력을 소개하기 위한 용도로만 사용하며 권리는 각 권리자에게 있습니다.

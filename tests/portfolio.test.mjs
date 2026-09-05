import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { careers, credits, projects } from "../content/portfolio.ts";
import { getYouTubeEmbedUrl, getYouTubeVideoId } from "../lib/youtube.ts";

test("YouTube URLs are parsed only for supported valid formats", () => {
  assert.equal(getYouTubeVideoId("https://www.youtube.com/watch?v=e9IbwldVgYk"), "e9IbwldVgYk");
  assert.equal(getYouTubeVideoId("https://youtu.be/qZvE5qLv4Ms"), "qZvE5qLv4Ms");
  assert.equal(getYouTubeVideoId("https://www.youtube.com/shorts/qZvE5qLv4Ms"), "qZvE5qLv4Ms");
  assert.equal(getYouTubeVideoId("https://example.com/watch?v=e9IbwldVgYk"), null);
  assert.equal(getYouTubeVideoId("not-a-url"), null);
});

test("embed URLs use YouTube privacy-enhanced mode", () => {
  assert.equal(
    getYouTubeEmbedUrl("https://www.youtube.com/watch?v=e9IbwldVgYk"),
    "https://www.youtube-nocookie.com/embed/e9IbwldVgYk?autoplay=1&playsinline=1&rel=0",
  );
});

test("portfolio project data has unique IDs and valid published media", () => {
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);

  for (const project of projects) {
    assert.ok(project.title);
    assert.ok(project.role);

    if (project.youtubeUrl) {
      assert.ok(getYouTubeVideoId(project.youtubeUrl), project.id);
    }

    if (project.thumbnail) {
      assert.ok(
        existsSync(join(process.cwd(), "public", project.thumbnail.slice(1))),
        project.thumbnail,
      );
    }
  }
});

test("career and filmography data is complete enough to render", () => {
  assert.equal(new Set(careers.map((career) => career.id)).size, careers.length);
  assert.equal(new Set(credits.map((credit) => credit.title)).size, credits.length);

  for (const career of careers) {
    assert.equal(career.highlights.length, 3, career.id);
    assert.ok(career.description);
  }

  for (const credit of credits) {
    assert.ok(credit.role, credit.title);
    assert.ok(
      existsSync(join(process.cwd(), "public", credit.image.slice(1))),
      credit.image,
    );
  }
});

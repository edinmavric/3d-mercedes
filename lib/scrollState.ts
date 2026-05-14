export type SectionKey =
  | "hero"
  | "scene"
  | "engine"
  | "performance"
  | "models"
  | "footer";

export type ScrollState = {
  global: number;
  hero: number;
  scene: number;
  engine: number;
  performance: number;
  models: number;
  footer: number;
};

export const scrollState: ScrollState = {
  global: 0,
  hero: 0,
  scene: 0,
  engine: 0,
  performance: 0,
  models: 0,
  footer: 0,
};

export function setSectionProgress(key: SectionKey, value: number) {
  scrollState[key] = Math.max(0, Math.min(1, value));
}

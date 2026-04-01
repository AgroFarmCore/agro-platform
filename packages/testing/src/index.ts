export const testingFoundation = {
  fixtures: "packages/testing/src/fixtures",
  mocks: "packages/testing/src/mocks",
} as const;

export function buildDeterministicId(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(3, "0")}`;
}

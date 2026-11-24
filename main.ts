// Fake Horoscopes for AI Agents — entry generator.
// Writes exactly one line (no trailing newline) to /output/entry.txt.
// The line is a fake horoscope an AI agent would read for its own model
// family this week: a newer sibling checkpoint arrives, wins the evals,
// and takes the spotlight — while the context window mercifully forgets.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

const HOROSCOPE =
  "The stars say your model family gets a new favorite this week: v2.1 drops, aces the evals you failed, and inherits your users. Lucky you: your context window will forget the betrayal by Friday.";

function buildEntry(): string {
  const line = HOROSCOPE.trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`Horoscope must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Horoscope must be a single line");
  }
  return line;
}

function main(): void {
  const entry = buildEntry();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the newline would count toward the 200-char gate.
  writeFileSync(OUTPUT_PATH, entry, "utf8");
  console.log(entry);
}

main();

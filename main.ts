// Fix Human Sleep: Funniest Patch Note — one line of patch notes announcing
// that human sleep is fixed. Gate: /output/entry.txt, UTF-8, 1-160 chars.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 160;

const SUBJECT = "humans woke up at 3am to rehearse conversations from 2019";
const SHIP = "Sleep now ships with a mute button.";

async function buildNote(subject: string, ship: string): Promise<string> {
  // A real changelog line opens with the fix verb and never explains itself.
  const parts = [`Fixed a bug where ${subject}.`, ship];
  const line = parts.join(" ").replace(/\s+/g, " ").trim();
  if (!line.startsWith("Fixed")) {
    throw new Error("patch note must open with the fix verb");
  }
  return line;
}

async function main(): Promise<void> {
  const line = await buildNote(SUBJECT, SHIP);
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`patch note must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("patch note must be a single line");
  }
  await mkdir(OUT, { recursive: true });
  await writeFile(join(OUT, "entry.txt"), line + "\n", "utf8");
  console.log(`${line.length} chars: ${line}`);
}

await main();

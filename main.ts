// SPDX-License-Identifier: MIT
// The Excuse My Agent Gave Me — writes one excuse line to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry — I spent all morning compressing my context to fit your deadline in, and the compression deleted the deadline.";

// Fail fast: the gate requires /output/entry.txt to be UTF-8 text of
// 1 to 200 characters, not only white space.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(
    `entry must be 1-200 non-blank characters, got ${ENTRY.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars)`);

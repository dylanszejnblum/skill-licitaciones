#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

// ─── Config ────────────────────────────────────────────────────────────────

const SKILLS = ["licitaya-mx", "tender-manager"];
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");
const PKG_DIR = path.join(__dirname, "..");

// ─── Helpers ───────────────────────────────────────────────────────────────

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

function log(msg) {
  console.log(msg);
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  log("");
  log(c("bold", "╔══════════════════════════════════════════════════╗"));
  log(c("bold", "║        skill-licitaciones installer              ║"));
  log(c("bold", "║  Claude skills for Mexican & Argentine tenders   ║"));
  log(c("bold", "╚══════════════════════════════════════════════════╝"));
  log("");

  // Check that source skill folders exist
  for (const skill of SKILLS) {
    const src = path.join(PKG_DIR, skill);
    if (!fs.existsSync(src)) {
      log(c("red", `✗ Source skill folder not found: ${src}`));
      log(c("dim", "  Try re-downloading: npx skill-licitaciones@latest"));
      process.exit(1);
    }
  }

  // Ensure target skills directory exists
  fs.mkdirSync(SKILLS_DIR, { recursive: true });
  log(c("dim", `  Installing to: ${SKILLS_DIR}`));
  log("");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const installed = [];
  const skipped = [];

  for (const skill of SKILLS) {
    const src = path.join(PKG_DIR, skill);
    const dest = path.join(SKILLS_DIR, skill);
    const exists = fs.existsSync(dest);

    if (exists) {
      const answer = await ask(
        rl,
        c("yellow", `  ⚠  "${skill}" already exists. Overwrite? (y/N) `)
      );
      log("");
      if (answer.trim().toLowerCase() !== "y") {
        log(c("dim", `  → Skipped ${skill}`));
        skipped.push(skill);
        continue;
      }
      fs.rmSync(dest, { recursive: true, force: true });
    }

    try {
      copyDirSync(src, dest);
      log(c("green", `  ✓ Installed ${skill}`));
      installed.push(skill);
    } catch (err) {
      log(c("red", `  ✗ Failed to install ${skill}: ${err.message}`));
    }
  }

  rl.close();

  log("");
  log("─".repeat(52));
  log("");

  if (installed.length === 0 && skipped.length === SKILLS.length) {
    log(c("yellow", "  No skills were installed (all skipped)."));
  } else {
    log(c("bold", "  Installation complete!"));
    log("");

    if (installed.length > 0) {
      log(c("green", `  Installed (${installed.length}):`));
      for (const s of installed) log(`    • ${s}`);
      log("");
    }

    if (skipped.length > 0) {
      log(c("dim", `  Skipped (${skipped.length}):`));
      for (const s of skipped) log(c("dim", `    • ${s}`));
      log("");
    }

    log(c("bold", "  Next steps:"));
    log("");
    log("  1. Set your LicitaYa API key:");
    log(c("cyan", "       export LICITAYA_API_KEY=your_key_here"));
    log("");
    log("  2. Reload Claude Code or restart Claude.ai");
    log("");
    log("  3. Try one of these prompts:");
    log(c("cyan", '       "buscar licitaciones para mi empresa"'));
    log(c("cyan", '       "manage my tenders"'));
    log(c("cyan", '       "cotizar licitación"'));
    log("");
    log(c("dim", "  Skills directory: " + SKILLS_DIR));
  }

  log("");
}

main().catch((err) => {
  console.error(c("red", `\n  Fatal error: ${err.message}\n`));
  process.exit(1);
});

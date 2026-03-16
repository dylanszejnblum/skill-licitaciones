# skill-licitaciones

Claude skills for finding, evaluating, and bidding on government tenders in Mexico and Argentina via the [LicitaYa](https://www.licitaya.com.mx) API.

## Install

```bash
npx github:dylanszejnblum/skill-licitaciones
```

That's it. The installer copies the skills into `~/.claude/skills/` and walks you through setup.

---

## What's included

Two skills are installed:

### `licitaya-mx` — API Wrapper

A focused skill for direct interaction with the LicitaYa API. Use this when you want to quickly search, view, or manage tenders without the full guided workflow.

**Triggers:**
- "buscar licitaciones"
- "search tenders"
- "find government contracts"
- "ver licitación [ID]"
- "mark tender as favorite"

**Capabilities:**
- Search tenders with keyword, location, value range, and date filters
- AI-powered smart search (`smartsearch=1`)
- View full tender details by ID
- Like / unlike tenders (save to favorites)
- Add private notes to tenders
- Exclude irrelevant tenders from your list

---

### `tender-manager` — Full Lifecycle Manager

A strategic partner that guides you through the entire government bidding process, from discovering opportunities to submitting a complete proposal.

**Triggers:**
- "manage my tenders"
- "buscar licitaciones para mi empresa"
- "help me bid on a contract"
- "cotizar licitación"
- "should I bid on this?"
- "write a proposal"
- "quiero participar en una licitación"

**Capabilities:**

| Phase | What it does |
|---|---|
| **0 — Company Profile** | One-time setup: sector, capabilities, keywords, contract size range |
| **1 — Scanning** | Multi-query search tuned to your profile, results ranked by fit score |
| **2 — Go/No-Go** | 6-dimension scorecard: capability fit, timeline, margin, competition, risk, strategic value |
| **3 — Cotización** | Structured cost breakdown (labor, materials, overhead, margin, IVA) with market rate benchmarks |
| **4 — Proposal Writing** | Full *propuesta técnica* + *propuesta económica* in formal Mexican government Spanish |
| **5 — Tracking** | Submission checklist, pipeline view, audit trail saved as tender comments |

**Reference library included:**
- `cotizacion-guide.md` — sector-specific cost rates and markup benchmarks (IT, construction, services, supplies)
- `proposal-templates.md` — ready-to-fill proposal sections (cover letter, methodology, team profile, pricing table, commercial conditions)
- `evaluation-framework.md` — go/no-go scoring rubrics by contract type, red flags, common traps
- `licitaya-api.md` — API quick reference

---

## Requirements

### LicitaYa API key

Both skills require a LicitaYa API key. Get one at [licitaya.com.mx](https://www.licitaya.com.mx) or [licitaya.com.ar](https://www.licitaya.com.ar).

Set it in your environment:

```bash
# Add to ~/.zshrc or ~/.bashrc for persistence
export LICITAYA_API_KEY=your_key_here
```

Or set it per-session before launching Claude Code:

```bash
LICITAYA_API_KEY=your_key_here claude
```

### Claude Code or Claude.ai

Skills work in both:
- **Claude Code** — place skill folders in `~/.claude/skills/` (the installer does this automatically)
- **Claude.ai** — go to Settings → Capabilities → Skills → Upload skill (zip each folder separately)

---

## Usage examples

### Quick tender search

```
busca licitaciones de tecnología en Jalisco con presupuesto entre 500k y 5M pesos
```

### Full bidding workflow

```
quiero participar en licitaciones — ayúdame a configurar mi empresa y encontrar oportunidades
```

Claude will:
1. Ask about your company (once per session)
2. Run several searches tuned to your profile
3. Score each opportunity and recommend the top ones
4. For each GO decision: build a cotización, then write the full proposal

### Price estimation only

```
cotiza esta licitación: [paste tender description or ID]
```

### Check a specific tender

```
dame los detalles de la licitación [ID] y dime si vale la pena participar
```

---

## File structure

```
skill-licitaciones/
├── licitaya-mx/
│   ├── SKILL.md                    # Skill instructions + frontmatter
│   └── references/
│       └── api-reference.md        # Full LicitaYa API parameter reference
│
└── tender-manager/
    ├── SKILL.md                    # Full lifecycle workflow instructions
    └── references/
        ├── cotizacion-guide.md     # Cost benchmarks by sector
        ├── proposal-templates.md   # Government proposal boilerplate in Spanish
        ├── evaluation-framework.md # Go/no-go scoring rubrics
        └── licitaya-api.md         # API quick reference
```

---

## Manual installation

If you prefer not to use npx:

```bash
# Clone the repo
git clone https://github.com/dylanszejnblum/skill-licitaciones.git

# Copy skills to Claude's skills directory
cp -r skill-licitaciones/licitaya-mx ~/.claude/skills/
cp -r skill-licitaciones/tender-manager ~/.claude/skills/
```

---

## Updating

To get the latest version:

```bash
npx skill-licitaciones@latest
```

The installer will ask before overwriting existing skills.

---

## API coverage

| Endpoint | Method | Skill |
|---|---|---|
| `/tender/search` | GET | Both |
| `/tender/{tenderId}` | GET | Both |
| `/tender/like` | POST | Both |
| `/tender/newcomment` | POST | Both |
| `/tender/erase` | POST | Both |

Supports both Mexico (`licitaya.com.mx`) and Argentina (`licitaya.com.ar`) endpoints.

---

## License

MIT

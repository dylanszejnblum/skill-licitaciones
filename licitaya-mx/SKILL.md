---
name: licitaya-mx
description: Fetches, searches, and manages government tenders (licitaciones) from the LicitaYa API for Mexico and Argentina. Use when user asks to "buscar licitaciones", "search tenders", "find government contracts", "participar en licitaciones", "ver licitación", "mark tender as favorite", "exclude tender", or "add comment to tender". Requires LICITAYA_API_KEY environment variable.
license: MIT
metadata:
  author: licitaciones-bot
  version: 1.0.0
  category: government-procurement
---

# LicitaYa MX/AR — Tender Management Skill

Handles fetching, searching, and interacting with government tenders via the LicitaYa REST API.

## Configuration

**Required:** Set your API key before any API call:
- Environment variable: `LICITAYA_API_KEY`
- Header: `X-API-KEY: <your_key>`

**Base URLs:**
- Mexico: `https://www.licitaya.com.mx/api/v1`
- Argentina: `https://www.licitaya.com.ar/api/v1`

Default to Mexico unless the user specifies Argentina.

## Instructions

### Step 1: Determine the action

Ask the user (or infer from context) what they want to do:
1. **Search** — find tenders matching keywords/filters
2. **View** — get details of a specific tender by ID
3. **Participate** — like, comment, or exclude a tender

### Step 2: Search for tenders

```
GET {base_url}/tender/search
Header: X-API-KEY: {key}
```

Key query parameters:
- `keyword` — search terms (e.g. "construcción", "software")
- `state` or `city` — geographic filter (mutually exclusive)
- `tender_value_min` / `tender_value_max` — price range (integer)
- `opening_date_from` / `opening_date_to` — date range (YYYYmmdd format)
- `page`, `items` — pagination (default page=1, items=20)
- `smartsearch=1` — enable AI-powered search
- `order` — sort: 0=relevance, 1=date asc, 2=date desc, 3=value asc, 4=value desc

CRITICAL: Always include `keyword` unless the user explicitly wants all tenders.

Present results as a table with: ID, title, value, opening date, location.

### Step 3: View a specific tender

```
GET {base_url}/tender/{tenderId}
Header: X-API-KEY: {key}
```

Show: title, description, value, opening date, location, requirements, status.

### Step 4: Participate in a tender

#### Mark as favorite (like)
```
POST {base_url}/tender/like
Header: X-API-KEY: {key}
Body: {"tenderId": "{id}", "value": 1}
```
Use `"value": 0` to unmark.

#### Add a private note
```
POST {base_url}/tender/newcomment
Header: X-API-KEY: {key}
Body: {"tenderId": "{id}", "comment": "{text}"}
```

#### Exclude tender from personal list
```
POST {base_url}/tender/erase
Header: X-API-KEY: {key}
Body: {"tenderId": "{id}", "value": 1}
```
Use `"value": 0` to restore.

## Workflow: Full participation flow

When user says "help me participate in tenders" or similar, follow this sequence:

1. Ask for keywords/sector of interest
2. Search with `smartsearch=1` and relevant `keyword`
3. Present top results (max 10) with summary
4. Ask which tenders to shortlist → like them (`POST /tender/like`)
5. For each shortlisted tender, fetch full details (`GET /tender/{id}`)
6. Help user draft participation notes → save as comment (`POST /tender/newcomment`)
7. For irrelevant results, offer to exclude them

## Examples

**Example 1: Basic search**
User: "busca licitaciones de tecnología en CDMX"
Actions:
1. Call `GET /tender/search?keyword=tecnología&city=CDMX&smartsearch=1`
2. Present results table
3. Ask if user wants to view details or shortlist any

**Example 2: Mark favorite and add note**
User: "me interesa la licitación ABC-123, guárdala y anota que tenemos experiencia"
Actions:
1. `POST /tender/like` with `tenderId=ABC-123, value=1`
2. `POST /tender/newcomment` with comment about experience
3. Confirm both actions succeeded

**Example 3: Value-based search**
User: "find tenders between 1M and 5M pesos"
Actions:
1. `GET /tender/search?tender_value_min=1000000&tender_value_max=5000000`
2. Present results sorted by value

## Troubleshooting

**Error: 401 Unauthorized**
Cause: Missing or invalid API key.
Solution: Verify `LICITAYA_API_KEY` is set. Ask user to provide their key from LicitaYa account settings.

**Error: 400 Bad Request on search**
Cause: `state` and `city` used together (mutually exclusive).
Solution: Use only one geographic filter at a time.

**Empty results**
Cause: Too many filters or keyword too specific.
Solution: Remove filters one by one, try broader keywords, or enable `smartsearch=1`.

**Date format errors**
Cause: Dates must be YYYYmmdd (e.g. 20260101, not 2026-01-01).
Solution: Strip dashes before sending.

See `references/api-reference.md` for full parameter details and response schemas.

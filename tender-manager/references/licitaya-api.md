# LicitaYa API Quick Reference

## Auth
Header: `X-API-KEY: {LICITAYA_API_KEY}`

## Base URLs
- Mexico: `https://www.licitaya.com.mx/api/v1`
- Argentina: `https://www.licitaya.com.ar/api/v1`

## Endpoints

### Search
`GET /tender/search`
- `keyword`, `state`|`city` (mutually exclusive), `tender_value_min`, `tender_value_max`
- `opening_date_from`/`to` (YYYYmmdd), `page`, `items`, `smartsearch` (0/1)
- `order`: 0=relevance, 1=date↑, 2=date↓, 3=value↑, 4=value↓

### Get Tender
`GET /tender/{tenderId}`

### Like
`POST /tender/like` — `{"tenderId":"X","value":1}` (0=unmark)

### Comment
`POST /tender/newcomment` — `{"tenderId":"X","comment":"text"}`

### Exclude
`POST /tender/erase` — `{"tenderId":"X","value":1}` (0=restore)

## Common Errors
- 401: Invalid/missing API key
- 400 on search: `state` and `city` used together
- Empty results: broaden keyword, try `smartsearch=1`
- Date errors: strip dashes → 20260101 not 2026-01-01

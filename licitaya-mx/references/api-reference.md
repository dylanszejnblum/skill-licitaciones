# LicitaYa API Reference v1.1.3

## Authentication
All endpoints require: `X-API-KEY: {your_api_key}` header.
Requests without a key return partial results or 401.

## Base URLs
- Mexico: `https://www.licitaya.com.mx/api/v1`
- Argentina: `https://www.licitaya.com.ar/api/v1`

---

## GET /tender/search

Search tenders with filters.

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | string | Search terms |
| `state` | string | State filter (mutually exclusive with city) |
| `city` | string | City filter (mutually exclusive with state) |
| `tender_value_min` | integer | Minimum tender value |
| `tender_value_max` | integer | Maximum tender value |
| `opening_date_from` | string | Start date YYYYmmdd |
| `opening_date_to` | string | End date YYYYmmdd |
| `page` | integer | Page number (default: 1) |
| `items` | integer | Items per page |
| `listing` | string | Listing type filter |
| `smartsearch` | integer | 0=standard, 1=AI-powered |
| `order` | integer | 0=relevance, 1=date↑, 2=date↓, 3=value↑, 4=value↓ |

### Response
```json
{
  "total": 150,
  "page": 1,
  "results": [
    {
      "id": "string",
      "title": "string",
      "value": 0,
      "opening_date": "string",
      "location": "string",
      "status": "string"
    }
  ]
}
```

---

## GET /tender/{tenderId}

Get full details for a specific tender.

### Path Parameters
- `tenderId` (required): Tender identifier string

### Response
Single Tender object with full details including description, requirements, dates, value, contact info.

---

## POST /tender/like

Mark or unmark a tender as favorite.

### Body
```json
{
  "tenderId": "string",
  "value": 1
}
```
- `value: 1` = mark as favorite
- `value: 0` = unmark

---

## POST /tender/newcomment

Add a private note to a tender.

### Body
```json
{
  "tenderId": "string",
  "comment": "Your private note text"
}
```

---

## POST /tender/erase

Exclude or restore a tender from your personal list.

### Body
```json
{
  "tenderId": "string",
  "value": 1
}
```
- `value: 1` = exclude
- `value: 0` = restore

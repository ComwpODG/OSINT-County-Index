# OSINT County Index

A lightweight, map-based OSINT tool for exploring and centralizing US county-level data.

---

## 🧭 Overview

This project focuses on building a unified county intelligence interface for OSINT workflows.

County-level data is often fragmented across multiple sources and formats. This tool aims to consolidate that information into a single, searchable, interactive map-based system.

The goal is not just visualization, but long-term dataset expansion and structured enrichment of county metadata.

---

## 🗺️ Features

- Interactive Leaflet-based county map
- Click-to-view county intelligence panel
- Searchable county navigation
- FIPS-based data linking between map and dataset
- Extensible JSON-based data architecture

---

# 🧩 HOW TO CONTRIBUTE

This project grows through structured, consistent expansion of the county dataset and improvements to the mapping system.
We are especially looking for contributions that improve **data coverage**.

---

### 📊 Adding or Updating County Data

County data lives in `countyData.json` and is indexed by FIPS code.

When adding or updating entries:

- Do not mess with the keys (`"01011:{"` for example)
- Paste the relevant details into the relevant fields
- Do your best to promote consistency
- Avoid removing existing data unless explicitly improving structure (or if the data was accidentally duplicated across multiple fields)

Example:

```json
"01011": {
  "stateAbbreviation": "AL",
  "County": "Bullock County",
  "courtWebsite": "no data yet",
  "courtWebsite2": "no data yet",
  "countyClerk": "no data yet",
  "secretaryOfStateWebsite": "no data yet",
  "workersCompWebsite": "no data yet",
  "notes": "No notes"
}

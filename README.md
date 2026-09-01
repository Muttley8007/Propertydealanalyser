# Property Deal Analyser PWA

A local-first property investment screening app based on the supplied `Moorooka_Unit_Purchase&Holding_Cashflow_Analysis` workbook.

## Included
- Four historical spreadsheet scenarios as sample data: $180K, $210K, Moorooka $275K and Moorooka $280K.
- Purchase and acquisition-cost modelling.
- Interest-only and principal-and-interest loan calculations.
- Rent, vacancy, property-management and recurring holding costs.
- Gross yield, net yield, monthly cash flow and cash-on-cash return.
- Screening score with optional land, development, value-add and flood-risk inputs.
- Side-by-side property comparison.
- Browser localStorage persistence.
- JSON export/import.
- Installable/offline PWA service worker.

## Important historical-data note
The workbook contains legacy assumptions and a few inconsistencies. Those numbers are preserved in the sample inputs/notes, but the app recalculates all saved properties using one consistent formula engine. For example, the $275K/$280K workbook labels property management as a 10% worst-case assumption while its formula actually uses 8%.

## Run locally
A service worker needs HTTP/HTTPS rather than `file://`. From this folder, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

For GitHub Pages, place these files at the repo root (or `/docs`) and enable Pages.

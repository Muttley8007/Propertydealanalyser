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


## Data-source model (v1.1)
The supplied workbook did not intend every number to be hard-coded. This revision labels inputs by source: USER, PROPERTY, CURRENT/QUOTE, or calculated by the app. It also includes an optional transfer-duty estimator for standard NSW and QLD investment purchases. Always verify duty and unusual transaction treatment with the relevant state revenue office or conveyancer.

The Moorooka workbook samples are preserved as historical scenarios, including their original stamp duty, fees, LMI and interest assumptions.


## v1.2 NSW planning API experiment
For NSW properties, enter a street address and press **Check NSW planning overlays**. The app attempts to resolve the address using NSW Spatial Services and query NSW Government ArcGIS REST layers for land zoning, minimum lot size, heritage, flood planning and bushfire-prone land. Results are stored with the property.

Flood results are screening only. NSW Planning advises that councils have been responsible for current local flood mapping since 14 July 2021, so a serious purchase should still be verified with the relevant council / Section 10.7 planning certificate. If a browser or government endpoint blocks a request, the app leaves the result unverified rather than treating it as 'not found'.

## v1.3 national planning adapter
The planning screen now uses a jurisdiction adapter selected from the property's State/Territory and stores a normalised result: zoning, minimum lot size, flood/inundation, heritage and bushfire.

Current automation tiers:
- **NSW:** automated government spatial screening for zoning, minimum lot size, flood, heritage and bushfire.
- **Victoria:** automated VicPlan screening for zoning, Floodway / LSIO / Special Building overlays, Heritage Overlay, Bushfire Prone Area and Bushfire Management Overlay.
- **Tasmania:** automated LIST/Tasmanian Planning Scheme screening for zoning and code overlays, including flood, bushfire and heritage terms.
- **Queensland, South Australia, Western Australia, ACT and Northern Territory:** supported in the national workflow with address resolution, the correct official planning-map link, and `Unknown` results until a dependable normalised public endpoint is available. The app deliberately does not convert missing data to “Not found”.

For non-NSW address geocoding, the app uses a user-triggered OpenStreetMap Nominatim lookup only to obtain a point for spatial queries. Planning/hazard classifications come from government services where automated coverage is enabled.

Every automated result remains a screening tool rather than a planning certificate. Local council flood mapping, parcel-specific planning rules and current statutory documents should be checked before committing to a purchase.

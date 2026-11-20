# The Journey of John Walter Roberts

An interactive story map following my great-great-grandfather, **John Walter Roberts (1880–1961)**, from a Florida farm to the Texas oil country, with discoveries from his records and the world events he lived through. Built for a family history "Connection Presentation" (2–2½ minutes).

**Live site:** https://theonlyrealagentp.github.io/john-walter-roberts-journey/

## Presenting

| Key | Action |
| --- | --- |
| `→` / `Space` / `Page Down` | Next stop (works with presentation clickers) |
| `←` / `Page Up` | Previous stop |
| `D` | Reveal the next discovery on the map |
| `O` | Zoom out to the whole journey |
| `P` | Present: full screen plus a timer (turns green between 2:00 and 2:30, red after) |
| `T` / `R` | Hide or reset the timer |

Click any **Meanwhile in the world** event, or a diamond on the timeline, to fly to it and see how old John was. Link straight to a stop with `#3`, `#5`, and so on.

## Editing the story

Everything lives in two data files. No build step is needed.

- [`data/journey.js`](data/journey.js): John's stops, discoveries, the "one lifetime" card and the closing card.
- [`data/world-events.js`](data/world-events.js): world, U.S., and Florida/Texas events from 1880–1961.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

## Sources

From John's FamilySearch profile ([9V9Q-191](https://www.familysearch.org/tree/person/details/9V9Q-191)) and attached records: U.S. censuses (1900, 1920, 1930, 1950), Texas County Marriage Index, Texas birth certificates for his sons, his World War I draft registration card (1918), Texas death records (1961), a Brazilian immigration card for his son Garrett (1960), and his [Find a Grave memorial](https://www.findagrave.com/memorial/193111128/john-walter-roberts).

Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors. Built with [Leaflet](https://leafletjs.com/).

## License

Copyright © 2026 Harrison Stewart. The code is free software under the [GNU AGPL v3.0 or later](LICENSE). The family history writing is mine to share. The historical records belong to their archives.

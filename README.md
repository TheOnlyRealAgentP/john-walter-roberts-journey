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
- [`data/photos.js`](data/photos.js): photo links, captions and credits, referenced by key from the other two files.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

## Sources

From John's FamilySearch profile ([9V9Q-191](https://www.familysearch.org/tree/person/details/9V9Q-191)) and the original record images:

- U.S. censuses: 1900 (Manatee County, Florida), 1920 (819 N. Zarzamora, San Antonio), 1930 (Bexar County), 1950 (1411 Miller St., Houston)
- Texas County Marriage Index (Harris County, 1906)
- Texas birth certificates for his sons: John Jr. (Cuero, 1915), Garrett (Dr. Kenney's Sanitarium, San Antonio, 1917), George (born at home, 1920)
- World War I draft registration card (San Antonio, 1918)
- Texas death certificate no. 33948 (Houston, 1961)
- Brazilian immigration card for his son Garrett (Rio de Janeiro, 1960)
- [Find a Grave memorial](https://www.findagrave.com/memorial/193111128/john-walter-roberts)

Where a record only names a town or district (his 1880 birth, the 1900 farm, the 1930 farm), the map shows a shaded area instead of an exact pin. Street addresses were placed with OpenStreetMap's geocoder; house numbering may have shifted slightly since then.

## Photos

Historical photos are linked from [Wikimedia Commons](https://commons.wikimedia.org/). Almost all are public domain; the 1918 Ford truck (CC BY-SA 4.0, Tomás Del Coro) and the Sputnik replica (CC BY-SA 3.0, Rept0n1x) are used under their Creative Commons licenses. Every photo's credit and license link is shown under it on the map and listed in [`data/photos.js`](data/photos.js).

Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors. Built with [Leaflet](https://leafletjs.com/).

## License

Copyright © 2026 Harrison Stewart. The code is free software under the [GNU AGPL v3.0 or later](LICENSE). The family history writing is mine to share. The historical records belong to their archives.

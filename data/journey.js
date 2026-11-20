/*
 * The journey of John Walter Roberts (1880–1961).
 *
 * Edit this file to change the story. Each stop becomes one chapter on the map.
 *
 * person.born / person.died: "YYYY-MM-DD" when the exact date is known, else "YYYY".
 *
 * stops: in the order they happened. Each stop:
 *   date         "YYYY", "YYYY-MM" or "YYYY-MM-DD"
 *   title        chapter heading
 *   place        name of the town / county / state
 *   lat, lng     map position
 *   zoom         optional map zoom for this stop (default 8)
 *   story        one or two short paragraphs (an array of strings)
 *   discoveries  little popups on the map: { title, text, source }
 *                add lat/lng to place a discovery somewhere else; it is then
 *                joined to the stop with a dotted line when revealed
 *   photo        optional { key: "name-in-data/photos.js", caption: "..." }
 *   areaKm       set when the records only name a town or district: draws a
 *                shaded circle of that radius instead of claiming an exact spot
 *   meanwhile    dates of events from world-events.js to show on the card
 *
 * closing: your own words about why John matters to you. It is the last card.
 *
 * Sources: FamilySearch person 9V9Q-191 and the records attached to it.
 */
window.JOURNEY = {
  person: {
    name: "John Walter Roberts",
    short: "John",
    born: "1880-05-25",
    died: "1961-06-01",
    relation: "My great-great-grandfather",
    familySearchId: "9V9Q-191"
  },
  presenter: "Harrison Stewart",

  intro: {
    kicker: "A family history map",
    text: [
      "From a Florida farm to the Texas oil country: 81 years, nine stops, and a world that changed completely around him."
    ]
  },

  stops: [
    {
      date: "1880-05-25",
      title: "Born on the Florida frontier",
      meanwhile: ["1883-08-27", "1886-10-28", "1888-06"],
      place: "St. Petersburg area, Pinellas peninsula, Florida",
      lat: 27.7709, lng: -82.6600, zoom: 10, areaKm: 9,
      photo: { key: "1880-st-pete-pier", caption: "St. Petersburg's railroad pier in 1896. The town grew up around the railroad after John was born." },
      story: [
        "John Walter Roberts was born on 25 May 1880 on Florida's Gulf Coast, the son of Andrew J. Roberts from South Carolina and Francis, from Georgia. His big sister Louella was five.",
        "Florida was still mostly wild country. No railroad had reached his corner of the coast, just scattered homesteads and orange groves."
      ],
      discoveries: [
        {
          title: "His hometown didn't exist yet",
          text: "His death certificate says he was born in St. Petersburg, but there was no town by that name in 1880. The railroad arrived in 1888 and the settlement was named after the Russian hometown of railroad builder Peter Demens. Pinellas County wasn't created until 1912.",
          source: "Texas death certificate no. 33948 (1961)"
        },
        {
          title: "Tampa? Miami? St. Petersburg?",
          text: "Every record answers differently. Garrett's 1917 birth certificate says John was born in Tampa. George's in 1920 says Miami. His death certificate says St. Petersburg. In 1880, the St. Petersburg area was part of Hillsborough County, and its county seat was Tampa.",
          source: "Texas birth certificates (1917, 1920) and death certificate (1961)"
        }
      ]
    },
    {
      date: "1900-06",
      title: "A farmer at twenty",
      meanwhile: ["1900-09-08", "1901-01-10", "1903-12-17"],
      place: "Ellenton & Parrish precincts, Manatee County, Florida",
      lat: 27.5530, lng: -82.4870, zoom: 11, areaKm: 7,
      photo: { key: "1900-orange-grove", caption: "A Florida orange grove around 1893, before the Great Freeze." },
      story: [
        "When the census taker came by in June 1900, John was 20, single, and farming beside his father on a rented farm.",
        "It was a full house: his parents, married 28 years; sister Louella, her husband Francis Chappell and their boys Francis Jr. and baby Paul; and a boarder named Joseph Wilson."
      ],
      discoveries: [
        {
          title: "His line on the page",
          text: "On the original census page he's listed right under his parents: \"John · Son · May 1880 · 20 · Single · Farmer.\" His father Andrew, two lines above him, was a farmer too.",
          source: "United States Census, 1900, Manatee County, Florida, ED 83, sheet 1B"
        },
        {
          title: "The Great Freeze",
          text: "When John was 14, two hard freezes in the winter of 1894–95 killed most of Florida's orange groves and ruined many farm families. Six years later the Roberts family was still working the land.",
          source: "Florida history"
        }
      ]
    },
    {
      date: "1906-05-27",
      title: "Gone to Texas, and married",
      meanwhile: ["1906-04-18", "1908-10-01"],
      place: "Harris County Courthouse, Houston, Texas",
      lat: 29.7611, lng: -95.3597, zoom: 13,
      photo: { key: "1906-houston-main-st", caption: "Main Street, Houston, around 1905–07." },
      story: [
        "Sometime after 1900, John left Florida for Texas, where an oil boom was beginning. On 27 May 1906 he married Laura Elizabeth Garrett, a 21-year-old from Hallettsville, Texas. The marriage was recorded by Harris County, at the courthouse in Houston.",
        "John would spend the rest of his life in Texas."
      ],
      discoveries: [
        {
          title: "A birthday wedding",
          text: "The county marriage index puts the wedding on 27 May 1906, just two days after John's 26th birthday. (The family tree had 1905. The record helped settle it.)",
          source: "Texas, County Marriage Index, 1837–1977"
        },
        {
          title: "Laura's hometown",
          text: "Laura was born 7 September 1884 in Hallettsville, Lavaca County, the daughter of George Washington Garrett and Harriet Sarah Lewis.",
          source: "Birth certificates of her sons; FamilySearch Family Tree",
          lat: 29.4439, lng: -96.9411
        }
      ]
    },
    {
      date: "1915-09-21",
      title: "Working on the railroad",
      meanwhile: ["1912-04-15", "1914-07-28", "1914-11-10"],
      place: "Lindenau, DeWitt County, Texas",
      lat: 29.1178, lng: -97.3708, zoom: 11,
      photo: { key: "1915-ghsa-map", caption: "The Galveston, Harrisburg & San Antonio Railway (bold line) around San Antonio and Cuero, from a 1918 federal valuation map." },
      story: [
        "By 1915, John and Laura were living in the small community of Lindenau, in DeWitt County. John was a section foreman for the Galveston, Harrisburg & San Antonio Railway, the boss of a crew that kept a stretch of track safe.",
        "On 21 September 1915 their first son, John Walter Jr., was born in nearby Cuero."
      ],
      discoveries: [
        {
          title: "The record that fixed the tree",
          text: "The family tree says John Jr. was born in San Antonio. His birth certificate says Cuero, gives the parents' home as Lindenau, and lists John's job: \"Section Foreman, G.H.&S.A. Ry.\"",
          source: "Texas birth certificate no. 36447 (1915)",
          lat: 29.0938, lng: -97.2900
        },
        {
          title: "What a section foreman did",
          text: "Railroads were split into \"sections\" a few miles long. A section foreman led the gang that replaced ties, tightened bolts, and walked the track so trains could run safely.",
          source: "Railroad history"
        }
      ]
    },
    {
      date: "1917-12-01",
      title: "My great-grandpa is born",
      meanwhile: ["1914-08-15", "1917-04-06"],
      place: "Dr. Kenney's Sanitarium, 209 Ogden St., San Antonio",
      lat: 29.4398, lng: -98.4931, zoom: 14,
      photo: { key: "1917-camp-travis", caption: "Drafted men reporting for service at Camp Travis, San Antonio, 1917." },
      story: [
        "By 1917 the family had moved to San Antonio, a city filling up with soldiers training for World War I. On Garrett's birth certificate, John's job is simply \"With U.S. Gov't.\"",
        "On 1 December 1917, Garrett William Roberts, my great-grandpa, was born at Dr. Kenney's Sanitarium, a small private hospital on Ogden Street."
      ],
      discoveries: [
        {
          title: "A name that carries family",
          text: "Garrett's first name is his mother's maiden name. Laura Garrett gave her family name to her son.",
          source: "Texas birth certificate no. 55517 (1917)"
        },
        {
          title: "The building is gone",
          text: "Dr. Kenney's Sanitarium was run by Dr. John W. Kenney Jr. at 209 Ogden Street. It was torn down in the early 1960s.",
          source: "McGovern Historical Center, Texas Medical Center Library"
        }
      ]
    },
    {
      date: "1918-09-12",
      title: "819 N. Zarzamora Street",
      meanwhile: ["1918-10", "1918-11-11", "1920-11-02"],
      place: "819 N. Zarzamora St., San Antonio",
      lat: 29.4357, lng: -98.5261, zoom: 15,
      photo: { key: "1918-ford-truck", caption: "A 1918 Ford truck, the kind of machine John drove for a living." },
      story: [
        "On 12 September 1918, John registered for the World War I draft from this address. He was 38 and drove a truck for Humble Oil & Refining Co. When he was born, there were no cars or trucks anywhere.",
        "Eighteen months later, on 13 March 1920, his third son George was born right here at home."
      ],
      discoveries: [
        {
          title: "What he looked like",
          text: "His draft card describes him: medium height, medium build, blue eyes, brown hair. It's the closest thing we have to a photo. He signed it \"John Walter Roberts.\"",
          source: "U.S. World War I Draft Registration Cards, 1917–1918"
        },
        {
          title: "His workplace",
          text: "The draft card says he worked out of Medina and El Paso streets, less than two miles from home. Humble Oil later grew into part of ExxonMobil.",
          source: "U.S. World War I Draft Registration Cards, 1917–1918",
          lat: 29.4186, lng: -98.5061
        },
        {
          title: "Born at home at 3:30 a.m.",
          text: "George Andrew was born in this house. His first name comes from Laura's father, George Garrett, and his middle name from John's father, Andrew Roberts. On the certificate, John's job is \"Oil refiner.\"",
          source: "Texas birth certificate no. 12539 (1920)"
        },
        {
          title: "\"John W. Roberls\"",
          text: "The 1920 census indexer misread his name as \"Roberls.\" The page also shows Laura's niece Lula Pearson, 18, living with them while she trained as a nurse. Baby George isn't listed: the census taker came in January, two months before he was born.",
          source: "United States Census, 1920, San Antonio Ward 3, ED 46, sheet 5A"
        }
      ]
    },
    {
      date: "1930-04",
      title: "Back to the land",
      meanwhile: ["1929-10-29", "1935-04-14", "1941-12-07"],
      place: "Justice Precinct 2, Bexar County, Texas",
      lat: 29.4241, lng: -98.4936, zoom: 9, areaKm: 25,
      photo: { key: "1930-texas-farmer", caption: "A Texas farmer in 1939, photographed by Russell Lee for the Farm Security Administration." },
      story: [
        "The 1930 census found John, now 50, farming again, running a general farm in Bexar County with Laura and their three boys, ages 10 to 14.",
        "The stock market had crashed about six months earlier. The Great Depression and the Dust Bowl years were coming."
      ],
      discoveries: [
        {
          title: "Full circle",
          text: "In 1900 the census called him a farmer. Then a railroad foreman, a government worker, a truck driver and an oil refiner. By 1930 he was a farmer again. The census only says \"Justice Precinct 2,\" so the farm's exact spot is unknown.",
          source: "United States Census, 1930, Bexar County, ED 15-158, sheet 9A"
        }
      ]
    },
    {
      date: "1950-04-10",
      title: "Still working at 69",
      meanwhile: ["1945-09-02", "1955-04-12", "1957-10-04"],
      place: "1411 Miller St., Houston",
      lat: 29.7403, lng: -95.3436, zoom: 15,
      story: [
        "Laura died in Houston on 10 February 1950. Two months later the census taker found John, 69 and listed as widowed, renting a room from the Deems family at 1411 Miller Street.",
        "He was still working, doing home repair for a contractor."
      ],
      discoveries: [
        {
          title: "The family keeps moving",
          text: "In 1960, John's son Garrett (my great-grandpa) arrived in Rio de Janeiro, Brazil, to work. His Brazilian immigration card names his parents: John Walter Roberts and Laura E. Garrett Roberts.",
          source: "Brasil, Cartões de Imigração, 1900–1980",
          lat: -22.9068, lng: -43.1729
        }
      ]
    },
    {
      date: "1961-06-01",
      title: "At rest beside Laura",
      meanwhile: ["1959-08-21", "1961-04-12", "1961-05-05"],
      place: "Forest Park Lawndale Cemetery, Houston",
      lat: 29.7183, lng: -95.2997, zoom: 14,
      story: [
        "John Walter Roberts died on 1 June 1961 at Benner's Sanitarium in Houston, a week after his 81st birthday. He had lived in Houston for 15 years.",
        "He was buried two days later at Forest Park Lawndale Cemetery, next to Laura."
      ],
      discoveries: [
        {
          title: "His life's work",
          text: "His death certificate lists his usual occupation as \"Carpenter, building industry.\" Farmer, railroad foreman, truck driver, oil refiner, farmer again, carpenter: he worked with his hands his whole life.",
          source: "Texas death certificate no. 33948 (1961)"
        },
        {
          title: "His last home",
          text: "His usual residence was 1702 Des Jardines Street, about a mile and a half from the cemetery.",
          source: "Texas death certificate no. 33948 (1961)",
          lat: 29.7234, lng: -95.3220
        },
        {
          title: "From wagons to rockets",
          text: "Seven weeks before John died, Yuri Gagarin became the first person in space. Less than a month before, Alan Shepard became the first American. John had been born before there were cars on the road.",
          source: "World events, 1961"
        }
      ]
    }
  ],

  lifetime: {
    title: "Born with horses, gone in the space age",
    before: [
      "When John was born in 1880 there were no cars, no airplanes, and no radio. Houses were lit by oil lamps. Here is what arrived during his 81 years:"
    ],
    after: [
      "He lived through two world wars, the 1918 flu, and the Great Depression. Near the end, his son was heading off to work in Brazil."
    ]
  },

  links: [
    { label: "FamilySearch: John Walter Roberts (9V9Q-191)", href: "https://www.familysearch.org/tree/person/details/9V9Q-191" },
    { label: "Find a Grave memorial", href: "https://www.findagrave.com/memorial/193111128/john-walter-roberts" }
  ],

  closing: {
    signoff: "great-great-grandson",
    title: "Why John matters to me",
    text: [
      "I found and attached 16 of John's 21 records myself, one census page at a time. Somewhere along the way he stopped being a name on a chart.",
      "He was a farmer, a railroad man, a truck driver, a carpenter, a husband, and a dad to three boys, one of them my great-grandpa Garrett. He kept working and kept moving his whole life. Following his journey reminds me that my own story started long before me."
    ]
  }
};

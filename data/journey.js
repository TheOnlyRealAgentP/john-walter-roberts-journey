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
 *   photo        optional { src: "img/file.jpg", caption: "..." }
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
      "From a Florida farm to the Texas oil country: 81 years, eight stops, and a world that changed completely around him."
    ]
  },

  stops: [
    {
      date: "1880-05-25",
      title: "Born on the Florida frontier",
      meanwhile: ["1883-08-27", "1886-10-28", "1888-06"],
      place: "St. Petersburg, Florida",
      lat: 27.7676, lng: -82.6403, zoom: 9,
      story: [
        "John Walter Roberts was born on 25 May 1880 on Florida's Gulf Coast, the son of Andrew J. Roberts from South Carolina and Francis, from Georgia. His big sister Louella was five.",
        "Florida was still mostly wild country. No railroad had reached his corner of the coast, just scattered homesteads and orange groves."
      ],
      discoveries: [
        {
          title: "His hometown didn't exist yet",
          text: "His death certificate says he was born in St. Petersburg, but there was no town by that name in 1880. The railroad arrived in 1888 and the settlement was named after the Russian hometown of railroad builder Peter Demens. Pinellas County wasn't created until 1912.",
          source: "Texas, Deaths, 1890–1977 (certificate no. 33948)"
        }
      ]
    },
    {
      date: "1900-06",
      title: "A farmer at twenty",
      meanwhile: ["1900-09-08", "1901-01-10", "1903-12-17"],
      place: "Ellenton & Parrish, Manatee County, Florida",
      lat: 27.5171, lng: -82.5487, zoom: 10,
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
      meanwhile: ["1908-10-01", "1912-04-15", "1914-07-28"],
      place: "Harris County (Houston), Texas",
      lat: 29.7604, lng: -95.3698, zoom: 9,
      story: [
        "Sometime after 1900, John left Florida for Texas, where an oil boom was beginning. On 27 May 1906 he married Laura Elizabeth Garrett, a 21-year-old from Hallettsville, Texas.",
        "John would spend the rest of his life in Texas."
      ],
      discoveries: [
        {
          title: "A birthday wedding",
          text: "The county marriage index puts the wedding on 27 May 1906, just two days after John's 26th birthday. (The family tree had 1905. The record helped settle it.)",
          source: "Texas, County Marriage Index, 1837–1977"
        },
        {
          title: "Laura's family",
          text: "Laura was born 7 September 1884 in Hallettsville, Lavaca County, Texas, the daughter of George Washington Garrett and Harriet Sarah Lewis.",
          source: "FamilySearch Family Tree"
        }
      ]
    },
    {
      date: "1915-09-21",
      title: "Three boys in San Antonio",
      meanwhile: ["1914-11-10", "1917-04-06"],
      place: "San Antonio, Bexar County, Texas",
      lat: 29.4241, lng: -98.4936, zoom: 11,
      story: [
        "John and Laura settled in San Antonio and had three sons: John Walter Jr. (1915), Garrett William (1917), and George Andrew (1920).",
        "Garrett, born on 1 December 1917, is my great-grandpa."
      ],
      discoveries: [
        {
          title: "Names that carry family",
          text: "Garrett's first name is his mother's maiden name. George Andrew got his first name from Laura's father, George Garrett, and his middle name from John's father, Andrew Roberts.",
          source: "Texas, Birth Certificates, 1903–1936"
        },
        {
          title: "\"John W. Roberls\"",
          text: "In the 1920 census, the indexer misread the handwriting and typed his name as \"Roberls.\" Baby George isn't listed at all: census day was January 1, and he wasn't born until March 13.",
          source: "United States Census, 1920, San Antonio Ward 3"
        }
      ]
    },
    {
      date: "1918-09-12",
      title: "Truck driver for Humble Oil",
      meanwhile: ["1918-10", "1918-11-11", "1920-11-02"],
      place: "N. Zarzamora Street, San Antonio",
      lat: 29.4335, lng: -98.5305, zoom: 13,
      story: [
        "On 12 September 1918, John registered for the World War I draft. He was 38, and he drove a truck for Humble Oil & Refining Co.",
        "When John was born, there were no cars or trucks anywhere. Now he drove one for a living."
      ],
      discoveries: [
        {
          title: "What he looked like",
          text: "His draft card describes him: medium height, medium build, blue eyes, brown hair. It's the closest thing we have to a photo. He signed it \"John Walter Roberts.\"",
          source: "U.S. World War I Draft Registration Cards, 1917–1918"
        },
        {
          title: "Home and work",
          text: "He lived at 819 N. Zarzamora Street with Laura and worked out of Medina and El Paso streets. Humble Oil later grew into part of ExxonMobil.",
          source: "U.S. World War I Draft Registration Cards, 1917–1918"
        },
        {
          title: "Two months to peace",
          text: "September 12, 1918 was the third draft registration day, for men 18 to 45. The war ended on November 11, before most of these men were ever called up.",
          source: "U.S. Selective Service history"
        }
      ]
    },
    {
      date: "1930-04",
      title: "Back to the land",
      meanwhile: ["1929-10-29", "1935-04-14", "1941-12-07"],
      place: "Precinct 2, Bexar County, Texas",
      lat: 29.45, lng: -98.52, zoom: 9,
      story: [
        "The 1930 census found John, now 50, farming again, running a general farm in Bexar County with Laura and their three boys, ages 10 to 14.",
        "The stock market had crashed about six months earlier. The Great Depression and the Dust Bowl years were coming."
      ],
      discoveries: [
        {
          title: "Full circle",
          text: "In 1900 the census called him a farmer. In 1918, a truck driver. By 1930 he was a farmer again. The census marks the family as living on a farm.",
          source: "United States Census, 1930, Precinct 2, Bexar County"
        }
      ]
    },
    {
      date: "1950-04-10",
      title: "Still working at 69",
      meanwhile: ["1945-09-02", "1955-04-12", "1957-10-04"],
      place: "Houston, Texas",
      lat: 29.7604, lng: -95.3698, zoom: 10,
      story: [
        "Laura died in Houston on 10 February 1950. Two months later the census taker found John, 69 and listed as widowed, lodging with the Deems family.",
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
      lat: 29.7183, lng: -95.2997, zoom: 13,
      story: [
        "John Walter Roberts died in Houston on 1 June 1961, a week after his 81st birthday.",
        "He was buried two days later at Forest Park Lawndale Cemetery, next to Laura."
      ],
      discoveries: [
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
      "He was a farmer, a truck driver, a husband, and a dad to three boys, one of them my great-grandpa Garrett. He kept working and kept moving his whole life. Following his journey reminds me that my own story started long before me."
    ]
  }
};

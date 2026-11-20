/*
 * "Meanwhile in the world" — major events from John Walter Roberts's lifetime (1880–1961).
 *
 * Each event:
 *   date   "YYYY-MM-DD" (or "YYYY-MM" / "YYYY" when only that much is known)
 *   title  short headline
 *   text   one or two sentences
 *   place  where it happened (omit lat/lng for worldwide events)
 *   cat    "world" | "us" | "war" | "science" | "culture" | "local" (Florida & Texas)
 *   img    optional photo key from data/photos.js
 *   first  optional short label: shows on the "One lifetime" card as something
 *          new that arrived during his life
 */
window.WORLD_EVENTS = [
  { date: "1880-01-27", cat: "science", title: "Edison patents his light bulb",
    text: "Thomas Edison receives a patent for a practical electric light bulb. Most homes are still lit by oil lamps and candles.",
    place: "Menlo Park, New Jersey", lat: 40.5568, lng: -74.3360 },

  { date: "1883-05-24", cat: "us", title: "The Brooklyn Bridge opens",
    text: "After 14 years of construction, it becomes the longest suspension bridge in the world.",
    place: "Brooklyn Bridge, New York City", lat: 40.7061, lng: -73.9969, img: "ev-brooklyn-bridge" },

  { date: "1883-08-27", cat: "world", title: "Krakatoa erupts",
    text: "The volcano's explosion is heard nearly 3,000 miles away, and ash in the sky turns sunsets red around the world for months.",
    place: "Krakatoa, Dutch East Indies (Indonesia)", lat: -6.102, lng: 105.423, img: "ev-krakatoa" },

  { date: "1883-11-18", cat: "us", title: "Railroads create time zones",
    text: "Before this, every town set its clocks by the sun. American and Canadian railroads switch to standard time zones.",
    place: "United States & Canada" },

  { date: "1886-10-28", cat: "us", title: "Statue of Liberty dedicated",
    text: "A gift from France, she will greet millions of immigrants arriving in New York Harbor.",
    place: "New York Harbor", lat: 40.6892, lng: -74.0445, img: "ev-statue-of-liberty" },

  { date: "1889-03-31", cat: "world", title: "The Eiffel Tower is finished",
    text: "Built for the Paris World's Fair, it stands as the tallest structure in the world until 1930.",
    place: "Paris, France", lat: 48.8584, lng: 2.2945 },

  { date: "1889-05-31", cat: "us", title: "The Johnstown Flood",
    text: "The South Fork Dam fails after heavy rain, sending a wall of water into the town. More than 2,200 people die.",
    place: "Johnstown, Pennsylvania", lat: 40.3267, lng: -78.9220 },

  { date: "1893-05-01", cat: "culture", title: "Chicago World's Fair opens",
    text: "The World's Columbian Exposition shows off electric lights and debuts George Ferris's giant wheel.",
    place: "Chicago, Illinois", lat: 41.7906, lng: -87.5831 },

  { date: "1896-04-06", cat: "culture", title: "First modern Olympic Games",
    text: "Athletes from 14 nations compete in Athens, reviving the ancient Greek games.",
    place: "Athens, Greece", lat: 37.9683, lng: 23.7410 },

  { date: "1896-08-16", cat: "world", title: "Gold found in the Klondike",
    text: "News of the strike sets off a stampede of around 100,000 fortune-seekers to Canada's Yukon.",
    place: "Bonanza Creek, Yukon, Canada", lat: 63.94, lng: -139.33 },

  { date: "1898-04-25", cat: "war", title: "Spanish–American War",
    text: "The U.S. goes to war with Spain. By year's end it controls Puerto Rico, Guam, and the Philippines.",
    place: "Havana Harbor, Cuba", lat: 23.1403, lng: -82.3436 },

  { date: "1901-01-22", cat: "world", title: "Queen Victoria dies",
    text: "Her 63-year reign ends; she had ruled since before the telegraph was in common use.",
    place: "Osborne House, Isle of Wight, England", lat: 50.7505, lng: -1.2696 },

  { date: "1901-09-14", cat: "us", title: "Teddy Roosevelt becomes President",
    text: "President McKinley is assassinated in Buffalo, and 42-year-old Theodore Roosevelt becomes the youngest president in U.S. history.",
    place: "Wilcox Mansion, Buffalo, New York", lat: 42.9017, lng: -78.8722 },

  { date: "1903-12-17", cat: "science", title: "The Wright brothers fly",
    text: "The first powered airplane flight lasts 12 seconds and covers 120 feet.",
    place: "Kill Devil Hills, near Kitty Hawk, North Carolina", lat: 36.0141, lng: -75.6681, first: "Airplanes", img: "ev-wright-flight" },

  { date: "1906-04-18", cat: "us", title: "San Francisco earthquake",
    text: "An earthquake and the fires that follow destroy much of the city. About 3,000 people die.",
    place: "San Francisco, California", lat: 37.7749, lng: -122.4194 },

  { date: "1908-10-01", cat: "science", title: "The Model T goes on sale",
    text: "Henry Ford builds a car ordinary families can afford. More than 15 million are made by 1927.",
    place: "Detroit, Michigan", lat: 42.3684, lng: -83.0650, first: "Family cars", img: "ev-model-t" },

  { date: "1912-04-15", cat: "world", title: "The Titanic sinks",
    text: "The \"unsinkable\" ship strikes an iceberg on her first voyage. More than 1,500 people die.",
    place: "North Atlantic Ocean", lat: 41.7325, lng: -49.9469, img: "ev-titanic" },

  { date: "1914-07-28", cat: "war", title: "World War I begins",
    text: "One month after Archduke Franz Ferdinand is assassinated in Sarajevo, Europe goes to war.",
    place: "Sarajevo, Bosnia", lat: 43.8580, lng: 18.4287 },

  { date: "1914-08-15", cat: "science", title: "The Panama Canal opens",
    text: "Ships no longer have to sail around South America to get from the Atlantic to the Pacific.",
    place: "Panama", lat: 9.08, lng: -79.68 },

  { date: "1917-04-06", cat: "war", title: "America enters World War I",
    text: "More than 4 million Americans will serve in uniform before the war ends.",
    place: "Washington, D.C.", lat: 38.8899, lng: -77.0091, img: "1917-camp-travis" },

  { date: "1918-10", cat: "world", title: "The 1918 flu pandemic",
    text: "Influenza kills an estimated 50 million people worldwide, including about 675,000 Americans. October 1918 is the deadliest month.",
    place: "Worldwide", img: "ev-flu-1918" },

  { date: "1918-11-11", cat: "war", title: "Armistice ends World War I",
    text: "The guns fall silent at 11 a.m. on the 11th day of the 11th month.",
    place: "Glade of the Armistice, Compiègne, France", lat: 49.4277, lng: 2.9063 },

  { date: "1920-08-18", cat: "us", title: "Women win the vote",
    text: "Tennessee becomes the 36th state to ratify the 19th Amendment, guaranteeing women the right to vote.",
    place: "Nashville, Tennessee", lat: 36.1659, lng: -86.7844, first: "Women voting nationwide" },

  { date: "1920-11-02", cat: "science", title: "First commercial radio broadcast",
    text: "Station KDKA reads the presidential election results over the air. Within a few years, families gather around the radio every night.",
    place: "Westinghouse plant, East Pittsburgh, Pennsylvania", lat: 40.3956, lng: -79.8389, first: "Radio", img: "ev-radio-8xk" },

  { date: "1927-05-21", cat: "science", title: "Lindbergh flies the Atlantic",
    text: "Charles Lindbergh lands in Paris after 33½ hours, the first solo nonstop flight across the ocean.",
    place: "Paris, France", lat: 48.9694, lng: 2.4414 },

  { date: "1927-10-06", cat: "culture", title: "Movies learn to talk",
    text: "The Jazz Singer premieres, the first feature-length film with synchronized spoken dialogue.",
    place: "Warners' Theatre, Broadway, New York City", lat: 40.7627, lng: -73.9831, first: "Talking movies" },

  { date: "1929-10-29", cat: "us", title: "The stock market crashes",
    text: "\"Black Tuesday\" begins the Great Depression. By 1933, about one in four American workers is out of a job.",
    place: "New York Stock Exchange, Wall Street", lat: 40.7069, lng: -74.0113, img: "ev-crash-1929" },

  { date: "1933-03-04", cat: "us", title: "FDR and the New Deal",
    text: "Franklin D. Roosevelt takes office: \"The only thing we have to fear is fear itself.\"",
    place: "Washington, D.C.", lat: 38.8899, lng: -77.0091 },

  { date: "1935-04-14", cat: "us", title: "Black Sunday in the Dust Bowl",
    text: "A giant wall of dust rolls across the Great Plains, turning day into night.",
    place: "Spearman, Texas, and across the Great Plains", lat: 36.1939, lng: -101.1922, img: "ev-dust-storm" },

  { date: "1935-09-30", cat: "science", title: "Hoover Dam is dedicated",
    text: "At 726 feet, it is the tallest dam in the world, taming the Colorado River and powering the Southwest.",
    place: "Black Canyon, Nevada–Arizona", lat: 36.0161, lng: -114.7377 },

  { date: "1937-05-27", cat: "science", title: "Golden Gate Bridge opens",
    text: "Its 4,200-foot main span is the longest of any suspension bridge in the world.",
    place: "San Francisco, California", lat: 37.8199, lng: -122.4783 },

  { date: "1939-04-30", cat: "science", title: "Television debuts",
    text: "At the New York World's Fair, Franklin Roosevelt becomes the first president to appear on television.",
    place: "Queens, New York", lat: 40.7466, lng: -73.8448, first: "Television" },

  { date: "1939-09-01", cat: "war", title: "World War II begins",
    text: "Germany invades Poland. Within days Britain and France declare war.",
    place: "Westerplatte, Gdańsk, Poland", lat: 54.4066, lng: 18.6705 },

  { date: "1941-12-07", cat: "war", title: "Pearl Harbor is attacked",
    text: "Japan's surprise attack brings the United States into World War II.",
    place: "Pearl Harbor, Hawaii", lat: 21.3649, lng: -157.9500, img: "ev-pearl-harbor" },

  { date: "1944-06-06", cat: "war", title: "D-Day",
    text: "About 156,000 Allied troops land on the beaches of Normandy.",
    place: "Normandy, France", lat: 49.3696, lng: -0.8806 },

  { date: "1945-09-02", cat: "war", title: "World War II ends",
    text: "Japan formally surrenders aboard the USS Missouri in Tokyo Bay.",
    place: "Tokyo Bay, Japan", lat: 35.35, lng: 139.75, img: "ev-surrender" },

  { date: "1947-04-15", cat: "culture", title: "Jackie Robinson takes the field",
    text: "He breaks baseball's color line, playing his first game for the Brooklyn Dodgers.",
    place: "Brooklyn, New York", lat: 40.6655, lng: -73.9583 },

  { date: "1950-06-25", cat: "war", title: "The Korean War begins",
    text: "North Korea invades South Korea, and American troops are sent to fight within days.",
    place: "38th parallel near Kaesong, Korea", lat: 37.97, lng: 126.55 },

  { date: "1953-05-29", cat: "world", title: "Everest is climbed",
    text: "Edmund Hillary and Tenzing Norgay become the first people to stand on the top of the world.",
    place: "Mount Everest, Nepal", lat: 27.9881, lng: 86.9250 },

  { date: "1954-05-17", cat: "us", title: "Brown v. Board of Education",
    text: "The Supreme Court rules that segregated public schools are unconstitutional.",
    place: "Washington, D.C.", lat: 38.8906, lng: -77.0044 },

  { date: "1955-04-12", cat: "science", title: "The polio vaccine works",
    text: "Jonas Salk's vaccine is announced safe and effective, ending one of parents' greatest fears.",
    place: "Rackham Auditorium, University of Michigan, Ann Arbor", lat: 42.2793, lng: -83.7394, first: "The polio vaccine", img: "ev-salk" },

  { date: "1955-07-17", cat: "culture", title: "Disneyland opens",
    text: "Walt Disney opens his theme park in what used to be an orange grove.",
    place: "Anaheim, California", lat: 33.8121, lng: -117.9190 },

  { date: "1956-06-29", cat: "science", title: "The Interstate Highway Act",
    text: "Congress funds 41,000 miles of highways, reshaping how Americans travel.",
    place: "United States" },

  { date: "1957-10-04", cat: "science", title: "Sputnik launches the Space Age",
    text: "The Soviet Union puts the first artificial satellite into orbit. Americans can hear it beeping on their radios.",
    place: "Baikonur Cosmodrome, Kazakhstan", lat: 45.92, lng: 63.342, first: "Satellites in orbit", img: "ev-sputnik" },

  { date: "1959-08-21", cat: "us", title: "Hawaii becomes the 50th state",
    text: "Alaska joined as the 49th state earlier in the year, giving the flag its 50 stars.",
    place: "Honolulu, Hawaii", lat: 21.3069, lng: -157.8583, img: "ev-hawaii" },

  { date: "1961-04-12", cat: "science", title: "First human in space",
    text: "Yuri Gagarin orbits the Earth once in 108 minutes.",
    place: "Baikonur, Kazakhstan", lat: 45.920, lng: 63.342, first: "People in space", img: "ev-gagarin" },

  { date: "1961-05-05", cat: "science", title: "First American in space",
    text: "Alan Shepard rides the Freedom 7 capsule on a 15-minute flight.",
    place: "Launch Complex 5, Cape Canaveral, Florida", lat: 28.4394, lng: -80.5733, img: "ev-freedom7" },

  { date: "1961-08-13", cat: "world", title: "The Berlin Wall goes up",
    text: "East Germany seals off West Berlin overnight with barbed wire, then concrete.",
    place: "Berlin, Germany", lat: 52.5163, lng: 13.3777 },

  /* ---- Close to home: Florida and Texas ---- */

  { date: "1888-06", cat: "local", title: "The railroad reaches Pinellas",
    text: "The Orange Belt Railway arrives on the Gulf Coast, and the new town at the end of the line is named St. Petersburg.",
    place: "St. Petersburg, Florida", lat: 27.7731, lng: -82.6400, img: "1880-st-pete-pier" },

  { date: "1894-12-29", cat: "local", title: "Florida's Great Freeze",
    text: "Two hard freezes in the winter of 1894–95 kill most of Florida's orange groves.",
    place: "Central Florida", lat: 28.05, lng: -81.95, img: "1900-orange-grove" },

  { date: "1900-09-08", cat: "local", title: "The Galveston hurricane",
    text: "The deadliest natural disaster in U.S. history kills an estimated 6,000 to 12,000 people on the Texas coast.",
    place: "Galveston, Texas", lat: 29.3013, lng: -94.7977, img: "ev-galveston" },

  { date: "1901-01-10", cat: "local", title: "Spindletop gushes oil",
    text: "A gusher near Beaumont sprays oil more than 100 feet into the air and launches the Texas oil boom.",
    place: "Beaumont, Texas", lat: 30.0186, lng: -94.0749, img: "ev-spindletop" },

  { date: "1914-11-10", cat: "local", title: "Houston becomes a seaport",
    text: "The deepened Houston Ship Channel opens, connecting the city to the Gulf of Mexico.",
    place: "Turning Basin, Houston Ship Channel, Texas", lat: 29.7475, lng: -95.266, img: "ev-ship-channel" }
];

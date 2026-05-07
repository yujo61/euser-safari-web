export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface SafariPackage {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  location: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  image: string;
  inclusions: string[];
  exclusions: string[];
  bestTime: string;
  parkFees: string;
}

export const safariPackages: SafariPackage[] = [
  {
    id: "mara-majesty",
    name: "The Mara Majesty",
    description: "The ultimate 3-day experience in Africa's most famous wildlife reserve.",
    longDescription: "Experience the heart of the African wilderness in the Maasai Mara. This 3-day safari is designed for those who want to witness the iconic Big Five and the breathtaking landscapes of the savannah in a condensed, high-impact journey.",
    price: 850,
    duration: "3 Days",
    location: "Maasai Mara National Reserve",
    highlights: ["Big Five Spotting", "Maasai Village Visit", "Golden Savannah Sunsets"],
    itinerary: [
      { day: 1, title: "Nairobi to Maasai Mara", description: "Departure from Nairobi, scenic drive through the Great Rift Valley, and afternoon game drive." },
      { day: 2, title: "Full Day Game Exploration", description: "Morning and afternoon game drives with a picnic lunch in the reserve." },
      { day: 3, title: "Early Morning Drive & Return", description: "Sunrise game drive followed by departure back to Nairobi." }
    ],
    image: "/images/mara-majesty.png",
    inclusions: ["Round-trip transport from Nairobi", "Accommodation in luxury tented camps", "All meals on safari", "Professional guide", "Game drives"],
    exclusions: ["International flights", "Visas", "Gratuities", "Personal expenses"],
    bestTime: "July to October (Migration season)",
    parkFees: "USD 200 per adult/day (Non-resident)"
  },
  {
    id: "amboseli-elephants",
    name: "Amboseli Elephant Trail",
    description: "Witness giant herds against the backdrop of Mt. Kilimanjaro.",
    longDescription: "Amboseli is world-renowned for its massive elephant herds and the most iconic view of Mt. Kilimanjaro. This 4-day tour offers a blend of majestic wildlife and stunning photography opportunities.",
    price: 1100,
    duration: "4 Days",
    location: "Amboseli National Park",
    highlights: ["Views of Kilimanjaro", "Giant Elephant Herds", "Swamp Wildlife"],
    itinerary: [
      { day: 1, title: "Arrival in Amboseli", description: "Afternoon game drive with Kilimanjaro views." },
      { day: 2, title: "Swamps and Plains", description: "Full day exploring the Observation Hill and Enkongo Narok swamp." },
      { day: 3, title: "Cultural Engagement", description: "Morning game drive and afternoon Maasai cultural experience." },
      { day: 4, title: "Final Drive to Nairobi", description: "Leisurely breakfast and return journey." }
    ],
    image: "/images/amboseli.png",
    inclusions: ["Round-trip transport", "Luxury lodge accommodation", "All meals", "Maasai village visit", "Game drives"],
    exclusions: ["International flights", "Visas", "Gratuities"],
    bestTime: "June to October, January to February",
    parkFees: "USD 100 per adult/day (Non-resident)"
  },
  {
    id: "samburu-wilderness",
    name: "Samburu Wilderness Explorer",
    description: "Discover the unique 'Special Five' in Kenya's rugged north.",
    longDescription: "Step off the beaten path into Samburu. Home to species found nowhere else—the Grevy's Zebra, Somali Ostrich, Reticulated Giraffe, Gerenuk, and Beisa Oryx.",
    price: 1450,
    duration: "5 Days",
    location: "Samburu National Reserve",
    highlights: ["The Samburu Special Five", "Ewaso Ng'iro River", "Rugged Landscapes"],
    itinerary: [
      { day: 1, title: "Nairobi to Samburu", description: "Drive north past Mt. Kenya to the arid Samburu plains." },
      { day: 2, title: "Special Five Discovery", description: "Full day tracking unique northern species." },
      { day: 3, title: "River Safari", description: "Exploring wildlife along the Ewaso Ng'iro River." },
      { day: 4, title: "Conservation Talk", description: "Visit to a local elephant research center." },
      { day: 5, title: "Return Journey", description: "Scenic drive back to Nairobi." }
    ],
    image: "/images/samburu.png",
    inclusions: ["Round-trip 4x4 transport", "Eco-camp accommodation", "All meals", "Elephant center visit", "Guided game drives"],
    exclusions: ["International flights", "Gratuities", "Premium drinks"],
    bestTime: "June to September, December to March",
    parkFees: "USD 100 per adult/day (Non-resident)"
  },
  {
    id: "lakes-and-lions",
    name: "Lakes & Lions",
    description: "A perfect blend of flamingo-filled lakes and Mara's big cats.",
    longDescription: "Combine the pink hues of Lake Nakuru's flamingos with the raw power of the Maasai Mara lion prides. A diverse 6-day journey through the Rift Valley.",
    price: 1980,
    duration: "6 Days",
    location: "Lake Nakuru & Maasai Mara",
    highlights: ["Flamingos & Rhinos", "Rift Valley Escarpment", "Lion tracking"],
    itinerary: [
      { day: 1, title: "Arrival at Lake Nakuru", description: "Afternoon game drive in Nakuru National Park." },
      { day: 2, title: "Nakuru to Mara", description: "Drive to the Mara and evening game watch." },
      { day: 3, title: "Mara Deep Dive", description: "Full day of tracking the big cats." },
      { day: 4, title: "River Crossings", description: "Exploring the Mara River loop." },
      { day: 5, title: "Maasai Interaction", description: "Morning drive and village visit." },
      { day: 6, title: "Farewell Africa", description: "Return to Nairobi." }
    ],
    image: "/images/nakuru.png",
    inclusions: ["All transport in safari land cruiser", "Full board accommodation", "Game drives", "Drinking water"],
    exclusions: ["International flights", "Visas", "Alcoholic beverages"],
    bestTime: "Year-round (Best July-October for Mara)",
    parkFees: "Varies by park (USD 100-200/day)"
  },
  {
    id: "beach-bush-escape",
    name: "Beach & Bush Escape",
    description: "The ultimate 10-day luxury from the savannah to the white sands of Diani.",
    longDescription: "Why choose? Experience the thrill of the hunt in the Mara and the serene beauty of the Indian Ocean. A premium escape for honeymooners and families alike.",
    price: 2950,
    duration: "10 Days",
    location: "Maasai Mara & Diani Beach",
    highlights: ["Lions & Leopards", "World-class Snorkeling", "Private Beach Dinner"],
    itinerary: [
      { day: 1, title: "Mara Start", description: "Flight to Mara and luxury camp check-in." },
      { day: 3, title: "Savannah Days", description: "3 days of high-intensity game viewing." },
      { day: 5, title: "Flight to Coast", description: "From the bush to the beach in 2 hours." },
      { day: 6, title: "Tropical Bliss", description: "Relaxation and water sports in Diani." },
      { day: 10, title: "Direct Flight", description: "Return to Nairobi." }
    ],
    image: "/images/diani-beach.png",
    inclusions: ["Internal flights (Mara & Diani)", "Luxury accommodation", "All meals on safari, Half-board at beach", "Airport transfers"],
    exclusions: ["International flights", "Water sports activities", "Spa treatments"],
    bestTime: "August to October, December to March",
    parkFees: "USD 200 per adult/day in Mara"
  },
  {
    id: "migration-epic",
    name: "Great Migration Epic",
    description: "Front-row seats to nature's greatest show on earth.",
    longDescription: "Specifically timed for the July-October crossings. Witness the drama of millions of wildebeest crossing the Mara River. A Once-in-a-lifetime photography tour.",
    price: 2400,
    duration: "7 Days",
    location: "Northern Maasai Mara",
    highlights: ["River Crossing Drama", "Predator Action", "Luxury Tented Camps"],
    itinerary: [
      { day: 1, title: "Arrival in the Thick of it", description: "Landing in the Mara North Conservancy." },
      { day: 2, title: "River Watch", description: "Waiting for the iconic crossings." },
      { day: 4, title: "Big Cat Tracking", description: "Following predators tailing the herds." },
      { day: 7, title: "Departure", description: "Final sunrise flight." }
    ],
    image: "/images/migration.png",
    inclusions: ["Internal flights", "Premium tented camp", "All meals and drinks (except premium)", "Exclusive game viewing"],
    exclusions: ["International flights", "Hot air balloon safari"],
    bestTime: "July to September",
    parkFees: "USD 200 per adult/day (Non-resident)"
  },
  {
    id: "tsavo-red",
    name: "Tsavo Red Elephant Expedition",
    description: "Explore the vast 'Man-Eaters' territory of Tsavo.",
    longDescription: "Tsavo is Kenya's largest park system. Famous for its red-dust elephants and the Mzima Springs. A rugged, expansive adventure for true explorers.",
    price: 1250,
    duration: "4 Days",
    location: "Tsavo East & West",
    highlights: ["Lugard Falls", "Mzima Springs", "Red Elephants"],
    itinerary: [
      { day: 1, title: "Tsavo East Entry", description: "Driving through the Galana River plains." },
      { day: 2, title: "West Exploration", description: "Lava flows and Mzima springs." },
      { day: 3, title: "Rhino Sanctuary", description: "Visit to the Ngulia Rhino Sanctuary." },
      { day: 4, title: "Coastal Connection", description: "Drive to Mombasa or return to Nairobi." }
    ],
    image: "/images/tsavo.png",
    inclusions: ["Round-trip transport", "Lodge accommodation", "All meals", "Guided game drives"],
    exclusions: ["International flights", "Gratuities", "Personal items"],
    bestTime: "June to October, January to February",
    parkFees: "USD 52 per adult/day (Non-resident)"
  },
  {
    id: "peak-plains",
    name: "Peak & Plains Adventure",
    description: "Mountains, Black Rhinos, and the equator crossing.",
    longDescription: "Combining the foothills of Mt. Kenya with the high concentrations of black rhinos in Ol Pejeta. A cooler, highland safari experience.",
    price: 2100,
    duration: "8 Days",
    location: "Mt. Kenya & Ol Pejeta",
    highlights: ["Rhino Conservation", "Chimpanzee Sanctuary", "Equator Photo Op"],
    itinerary: [
      { day: 1, title: "Mt. Kenya Foothills", description: "Arrival at the slopes of Kenya's highest peak." },
      { day: 3, title: "Ol Pejeta Plains", description: "Intensive rhino tracking." },
      { day: 5, title: "Solio Ranch", description: "Visit to the private leopard sanctuary." },
      { day: 8, title: "Highland Return", description: "Drive back to Nairobi." }
    ],
    image: "/images/mt-kenya.png",
    inclusions: ["Transport in 4x4", "Highland lodge accommodation", "All meals", "Sanctuary entry fees"],
    exclusions: ["International flights", "Gratuities", "Alcoholic drinks"],
    bestTime: "June to September, December to March",
    parkFees: "Varies by conservancy (USD 90-120/day)"
  },
  {
    id: "rift-valley-explorer",
    name: "Rift Valley Explorer",
    description: "A quick but breathtaking weekend escape to Lake Naivasha.",
    longDescription: "Perfect for business travelers or those with limited time. Boat rides among hippos and walking safaris among zebras in Hell's Gate.",
    price: 450,
    duration: "2 Days",
    location: "Lake Naivasha",
    highlights: ["Boat Safari", "Crescent Island Walk", "Gorges Exploration"],
    itinerary: [
      { day: 1, title: "Naivasha Arrival", description: "Boat ride and lunch at the lake side." },
      { day: 2, title: "Hell's Gate Adventure", description: "Cycling and hiking in the gorges before return." }
    ],
    image: "/images/naivasha.png",
    inclusions: ["Round-trip transport", "Overnight accommodation", "All meals", "Boat ride", "Bicycle rental"],
    exclusions: ["International flights", "Gratuities", "Drinks"],
    bestTime: "Year-round",
    parkFees: "USD 30 per adult/day for Hell's Gate"
  },
  {
    id: "kenyan-grandeur",
    name: "The Kenyan Grandeur",
    description: "14 days of absolute immersion in Kenya's biodiversity.",
    longDescription: "The ultimate cross-country expedition. This tour covers everything from the northern deserts to the southern plains and the coastal breeze.",
    price: 4800,
    duration: "14 Days",
    location: "Multi-Destination",
    highlights: ["7 National Parks", "Private Guides", "Luxury Logistics"],
    itinerary: [
      { day: 1, title: "Grand Kickoff", description: "Nairobi arrival and welcome dinner." },
      { day: 3, title: "Northern Circuit", description: "Samburu and Mt. Kenya." },
      { day: 7, title: "The Great Rift", description: "Bogoria, Nakuru, and Naivasha." },
      { day: 10, title: "Mara Finale", description: "3 days in the crowning jewel." },
      { day: 14, title: "Final Departure", description: "Coastal breakfast and flight out." }
    ],
    image: "/images/kenya-grandeur.png",
    inclusions: ["All domestic flights & transport", "Premium luxury lodges", "All meals and selected drinks", "Private guide", "All activities"],
    exclusions: ["International flights", "Premium spirits", "Visas"],
    bestTime: "July to October, December to March",
    parkFees: "All park fees included"
  }
];

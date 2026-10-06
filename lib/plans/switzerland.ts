import type { StyleCategory } from "@/lib/category-style";

// Hand-built itinerary for the Switzerland trip (16-19 Oct 2026).
// Costs are estimates in CHF for the two travelers together and should be
// re-checked on the official sites before going (prices/hours change, and
// mid-October is shoulder season for several attractions).

export interface PlanStop {
  start: string; // "HH:MM" 24h
  durationMin: number;
  title: string;
  category: StyleCategory;
  description: string;
  /** Estimated cost for both travelers in CHF. 0 = free, null = not applicable. */
  costChf: number | null;
  costNote?: string;
  /** Drive from the previous stop of the same day. */
  drive?: { km: number; min: number };
  /** Text for the Google Maps pin / search. */
  mapsQuery: string;
  /** Text for the Google web search. */
  searchQuery: string;
}

export interface PlanDay {
  date: string; // YYYY-MM-DD
  title: string;
  summary: string;
  stops: PlanStop[];
}

export interface Plan {
  slug: string;
  title: string;
  subtitle: string;
  notes: string[];
  days: PlanDay[];
}

export const switzerlandPlan: Plan = {
  slug: "switzerland-oct-2026",
  title: "Switzerland, 16–19 Oct 2026",
  subtitle:
    "Two travelers, car all 4 days. Hotels: Seehotel Pilatus (nights of 16 & 17), Ruby Mimi Zurich (night of 18). Max 1.5h per drive, leaving the hotel around 10:00.",
  notes: [
    "Flights (El Al, booking X4MLU5): LY347 TLV 06:25 → ZRH 09:45 on 16 Oct. LY344 ZRH 21:15 → TLV 02:10 on 20 Oct (be at the airport by ~18:15).",
    "Costs are estimates for 2 people in CHF; verify on the official sites. Mid-October is shoulder season: confirm Pilatus, Trümmelbach, Rhine Falls boats and the Ebenalp cable car are running (some have annual maintenance closures).",
    "Restaurant picks are suggestions from general knowledge — check opening hours and book Day 3 dinner. Sunday 18 Oct: shops closed, restaurants and attractions open.",
    "Rental cars from Swiss locations normally include the motorway vignette; confirm with Sixt. Ask Ruby Mimi about parking for the car on the night of the 18th.",
    "Not included: Schilthorn or Jungfraujoch (too long/expensive for the 1.5h driving rule), parking at hotels, souvenirs.",
  ],
  days: [
    {
      date: "2026-10-16",
      title: "Arrival, Rhine Falls & Lucerne",
      summary: "Land, pick up the car, Europe's biggest waterfall, then Lucerne's old town and lake at sunset.",
      stops: [
        {
          start: "09:45",
          durationMin: 90,
          title: "Land at Zurich Airport (LY347), passport control, bags",
          category: "flight",
          description:
            "Biometric EU Entry/Exit System may add queue time. Collect bags and head to the Sixt desk.",
          costChf: null,
          mapsQuery: "Zurich Airport Sixt car rental",
          searchQuery: "Zurich Airport Sixt car rental pickup",
        },
        {
          start: "11:15",
          durationMin: 15,
          title: "Pick up the Sixt rental car",
          category: "transport",
          description: "Check the car for damage, vignette sticker and fuel policy before leaving.",
          costChf: 0,
          costNote: "Already booked via Rentalcars.com",
          mapsQuery: "Sixt Zurich Airport",
          searchQuery: "Sixt Zurich Airport opening hours",
        },
        {
          start: "12:05",
          durationMin: 130,
          title: "Rhine Falls (Rheinfall), Neuhausen",
          category: "sightseeing",
          description:
            "Europe's largest waterfall. Viewing platforms at Schloss Laufen, then the boat to the rock in the middle of the falls (~30 min). Lunch at Schlössli Wörth with the falls as the backdrop.",
          costChf: 100,
          costNote: "Boat ~CHF 9–10 pp, castle platform ~CHF 5 pp, parking ~CHF 8, lunch ~CHF 60 for two",
          drive: { km: 30, min: 35 },
          mapsQuery: "Rheinfall Neuhausen Switzerland",
          searchQuery: "Rheinfall Neuhausen boat tickets Schlössli Wörth",
        },
        {
          start: "15:35",
          durationMin: 25,
          title: "Check in / drop bags at Seehotel Pilatus, Hergiswil",
          category: "lodging",
          description: "Lakeside hotel on Lake Lucerne. Drop bags and freshen up before heading to Lucerne.",
          costChf: null,
          costNote: "Hotel already booked",
          drive: { km: 90, min: 80 },
          mapsQuery: "Seehotel Pilatus Hergiswil",
          searchQuery: "Seehotel Pilatus Hergiswil",
        },
        {
          start: "16:15",
          durationMin: 135,
          title: "Lucerne old town: Chapel Bridge, Lion Monument, lake promenade",
          category: "sightseeing",
          description:
            "Kapellbrücke and Wasserturm (~45 min), old town squares and Jesuit church (~45 min), Lion Monument (~20 min), lakeside walk (~25 min) as the sun sets (~18:10).",
          costChf: 10,
          costNote: "Sights free; ~CHF 3–4/h parking garage",
          drive: { km: 10, min: 15 },
          mapsQuery: "Kapellbrücke Lucerne",
          searchQuery: "Lucerne Chapel Bridge Lion Monument walking tour",
        },
        {
          start: "18:30",
          durationMin: 90,
          title: "Dinner: Rathaus Brauerei, Lucerne",
          category: "food",
          description:
            "Swiss beer-hall classics on the Kornmarkt, mains ~CHF 30–40. Alternative: Zunfthaus Pfistern.",
          costChf: 90,
          costNote: "~CHF 90 for two with drinks",
          mapsQuery: "Rathaus Brauerei Lucerne",
          searchQuery: "Rathaus Brauerei Luzern menu reservation",
        },
        {
          start: "20:15",
          durationMin: 15,
          title: "Drive back to Seehotel Pilatus",
          category: "lodging",
          description: "Night 1 at the hotel.",
          costChf: null,
          drive: { km: 10, min: 15 },
          mapsQuery: "Seehotel Pilatus Hergiswil",
          searchQuery: "Seehotel Pilatus Hergiswil",
        },
      ],
    },
    {
      date: "2026-10-17",
      title: "Jungfrau region: Aare Gorge, Lauterbrunnen & Stechelberg",
      summary: "Your own version of the Jungfrau day trips: gorge walk, waterfalls and the valley's viewpoints.",
      stops: [
        {
          start: "10:00",
          durationMin: 5,
          title: "Leave Seehotel Pilatus",
          category: "lodging",
          description: "Drive over the Brünig pass towards Meiringen.",
          costChf: null,
          mapsQuery: "Seehotel Pilatus Hergiswil",
          searchQuery: "Seehotel Pilatus Hergiswil",
        },
        {
          start: "11:00",
          durationMin: 75,
          title: "Aare Gorge (Aareschlucht), Meiringen",
          category: "sightseeing",
          description:
            "1.4 km walk on catwalks cut into the limestone walls above the Aare river. Easy, mostly flat, about an hour.",
          costChf: 32,
          costNote: "~CHF 10–11 pp entry, ~CHF 8–10 parking",
          drive: { km: 45, min: 55 },
          mapsQuery: "Aareschlucht Meiringen",
          searchQuery: "Aareschlucht Meiringen opening hours tickets",
        },
        {
          start: "12:15",
          durationMin: 45,
          title: "Lunch in Meiringen",
          category: "food",
          description: "Home of the meringue — try one for dessert. Casual café or Gasthof in the centre.",
          costChf: 60,
          costNote: "~CHF 60 for two",
          drive: { km: 3, min: 8 },
          mapsQuery: "Meiringen restaurant centre",
          searchQuery: "Meiringen meringue restaurant lunch",
        },
        {
          start: "13:50",
          durationMin: 25,
          title: "Staubbach Falls, Lauterbrunnen",
          category: "sightseeing",
          description:
            "A 270 m waterfall right beside the village; a short stroll from the parking lot with the classic valley view.",
          costChf: 10,
          costNote: "Free; parking ~CHF 10/day",
          drive: { km: 40, min: 50 },
          mapsQuery: "Staubbach Falls Lauterbrunnen",
          searchQuery: "Staubbachfall Lauterbrunnen viewpoint",
        },
        {
          start: "14:30",
          durationMin: 75,
          title: "Trümmelbach Falls",
          category: "sightseeing",
          description:
            "Ten glacier-fed waterfalls thundering inside the mountain, reached by tunnel lift and walkways. Last entry is late afternoon and it closes for the season in early November.",
          costChf: 34,
          costNote: "~CHF 16–17 pp",
          drive: { km: 3, min: 6 },
          mapsQuery: "Trümmelbach Falls",
          searchQuery: "Trümmelbachfälle opening hours tickets",
        },
        {
          start: "15:50",
          durationMin: 40,
          title: "Stechelberg viewpoint & end of the valley",
          category: "sightseeing",
          description:
            "Quiet end of the Lauterbrunnen valley below the Schilthorn cable car. Short walk and photos of the cliffs and falls.",
          costChf: 5,
          costNote: "Parking ~CHF 5",
          drive: { km: 4, min: 8 },
          mapsQuery: "Stechelberg Switzerland",
          searchQuery: "Stechelberg viewpoint Lauterbrunnen valley walk",
        },
        {
          start: "16:30",
          durationMin: 90,
          title: "Drive back to Hergiswil via Interlaken & Brünig",
          category: "transport",
          description: "Longest drive of the trip, right at the 1.5h limit. Optional coffee stop in Interlaken.",
          costChf: null,
          drive: { km: 85, min: 90 },
          mapsQuery: "Seehotel Pilatus Hergiswil",
          searchQuery: "Interlaken to Hergiswil drive",
        },
        {
          start: "18:45",
          durationMin: 90,
          title: "Dinner: Zunfthaus Pfistern, Lucerne",
          category: "food",
          description:
            "Historic guild house on the Reuss with traditional Swiss cooking. Fallback: the Seehotel's own restaurant if you're tired.",
          costChf: 100,
          costNote: "~CHF 100 for two",
          drive: { km: 10, min: 15 },
          mapsQuery: "Zunfthaus Pfistern Lucerne",
          searchQuery: "Zunfthaus zu Pfistern Luzern menu reservation",
        },
      ],
    },
    {
      date: "2026-10-18",
      title: "Mt Pilatus, Zug & Zurich",
      summary: "Cog railway to Pilatus Kulm, the lakeside town of Zug, then settle into Zurich for the evening.",
      stops: [
        {
          start: "09:45",
          durationMin: 15,
          title: "Check out of Seehotel Pilatus",
          category: "lodging",
          description: "Load the luggage into the car.",
          costChf: null,
          mapsQuery: "Seehotel Pilatus Hergiswil",
          searchQuery: "Seehotel Pilatus Hergiswil",
        },
        {
          start: "10:15",
          durationMin: 195,
          title: "Mt Pilatus (Pilatus Kulm) via the cog railway",
          category: "activity",
          description:
            "World's steepest cog railway from Alpnachstad (~30–40 min each way). About 2 hours at the summit for the viewpoints, the Dragon Trail and lunch. Ride back down the same way since the car is at the station.",
          costChf: 216,
          costNote: "Return ticket ~CHF 78 pp (~CHF 156), lunch ~CHF 60, parking free/low",
          drive: { km: 6, min: 10 },
          mapsQuery: "Pilatus Bahn Alpnachstad",
          searchQuery: "Pilatus cog railway Alpnachstad tickets timetable October",
        },
        {
          start: "14:20",
          durationMin: 100,
          title: "Zug old town & lakeside",
          category: "sightseeing",
          description:
            "Zytturm clock tower, Fischmarkt and promenade. Try the local Zuger Kirschtorte (cherry cake) at a café.",
          costChf: 25,
          costNote: "Café ~CHF 20, parking ~CHF 5",
          drive: { km: 40, min: 50 },
          mapsQuery: "Zug Altstadt Zytturm",
          searchQuery: "Zug old town Zytturm Kirschtorte café",
        },
        {
          start: "16:45",
          durationMin: 45,
          title: "Check in at Ruby Mimi Hotel Zurich",
          category: "lodging",
          description: "Ask about parking for the rental car (may be an extra charge).",
          costChf: 35,
          costNote: "Parking estimate ~CHF 30–40/night, verify",
          drive: { km: 30, min: 35 },
          mapsQuery: "Ruby Mimi Hotel Zurich",
          searchQuery: "Ruby Mimi Hotel Zurich parking",
        },
        {
          start: "17:45",
          durationMin: 90,
          title: "Lindenhof, Grossmünster & Niederdorf stroll",
          category: "sightseeing",
          description:
            "Lindenhof viewpoint over the old town at sunset (~18:10), Grossmünster, the Limmat river and the Niederdorf lanes. Take tram or taxi from the hotel.",
          costChf: 10,
          costNote: "Tram ~CHF 5 pp",
          mapsQuery: "Lindenhof Zurich",
          searchQuery: "Zurich Lindenhof Grossmünster Niederdorf walking route",
        },
        {
          start: "19:30",
          durationMin: 90,
          title: "Dinner: Zeughauskeller, Zurich",
          category: "food",
          description:
            "Huge historic arsenal hall on Paradeplatz with Swiss classics and generous portions, ~CHF 30 mains. Alternative: Swiss Chuchi for fondue.",
          costChf: 80,
          costNote: "~CHF 80 for two",
          mapsQuery: "Zeughauskeller Zurich",
          searchQuery: "Zeughauskeller Zürich menu reservation",
        },
      ],
    },
    {
      date: "2026-10-19",
      title: "Appenzell & flight home",
      summary: "Painted villages and a cliffside cave chapel, then back to the airport for the 21:15 flight.",
      stops: [
        {
          start: "09:45",
          durationMin: 15,
          title: "Check out of Ruby Mimi, load the car",
          category: "lodging",
          description: "Luggage stays in the car for the whole day.",
          costChf: null,
          mapsQuery: "Ruby Mimi Hotel Zurich",
          searchQuery: "Ruby Mimi Hotel Zurich",
        },
        {
          start: "11:30",
          durationMin: 135,
          title: "Ebenalp & Wildkirchli cave chapel",
          category: "activity",
          description:
            "Cable car from Wasserauen up to Ebenalp, then a short walk to the Wildkirchli caves and the cliff-hugging Berggasthaus Aescher (lunch: rösti, cheese, local beer).",
          costChf: 115,
          costNote: "Cable car return ~CHF 30–33 pp (~CHF 65), lunch ~CHF 45, parking ~CHF 5",
          drive: { km: 100, min: 85 },
          mapsQuery: "Ebenalp Bergbahn Wasserauen",
          searchQuery: "Ebenalp Wildkirchli Aescher cable car tickets",
        },
        {
          start: "14:15",
          durationMin: 90,
          title: "Appenzell village + early dinner",
          category: "sightseeing",
          description:
            "Painted facades on Hauptgasse, Appenzeller cheese and the spiced Biber cake (~45 min), then an early dinner, e.g. at the Hotel Säntis restaurant (~45 min), since there's no time for a proper dinner near the airport.",
          costChf: 85,
          costNote: "Dinner ~CHF 70 + treats ~CHF 15",
          drive: { km: 5, min: 10 },
          mapsQuery: "Appenzell Hauptgasse",
          searchQuery: "Appenzell village Hauptgasse cheese Biber restaurant",
        },
        {
          start: "15:45",
          durationMin: 80,
          title: "Drive to Zurich Airport & return the Sixt car",
          category: "transport",
          description: "Refuel before returning the car. Allow buffer for Monday traffic around Zurich.",
          costChf: 20,
          costNote: "Fuel top-up estimate",
          drive: { km: 100, min: 80 },
          mapsQuery: "Sixt car return Zurich Airport",
          searchQuery: "Sixt Zurich Airport car return location",
        },
        {
          start: "18:15",
          durationMin: 180,
          title: "Check in & fly home (LY344, 21:15)",
          category: "flight",
          description: "Arrives Tel Aviv 02:10 on 20 Oct.",
          costChf: null,
          mapsQuery: "Zurich Airport Terminal 1 departures",
          searchQuery: "Zurich Airport El Al check-in LY344",
        },
      ],
    },
  ],
};

// ---- link helpers (all derived from names, never hard-coded URLs) ----

export function googleSearchUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function googleMapsPlaceUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsDirectionsUrl(
  origin: string,
  destination: string,
  waypoints: string[] = []
): string {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });
  if (waypoints.length > 0) params.set("waypoints", waypoints.join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

// ---- time helpers ----

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function endTime(stop: PlanStop): string {
  const total = toMinutes(stop.start) + stop.durationMin;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function dayTotals(day: PlanDay) {
  let cost = 0;
  let km = 0;
  let driveMin = 0;
  for (const s of day.stops) {
    cost += s.costChf ?? 0;
    km += s.drive?.km ?? 0;
    driveMin += s.drive?.min ?? 0;
  }
  return { cost, km, driveMin };
}

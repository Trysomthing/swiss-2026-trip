import { Clock, Car, Wallet, Search, MapPin, Route, Info } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { parseDateOnly, formatTime12h } from "@/lib/date-utils";
import { getCategoryStyle, tintBg, tintInk } from "@/lib/category-style";
import {
  dayTotals,
  endTime,
  formatDuration,
  googleMapsDirectionsUrl,
  googleMapsPlaceUrl,
  googleSearchUrl,
  switzerlandPlan,
  type PlanDay,
  type PlanStop,
} from "@/lib/plans/switzerland";
import { format } from "date-fns";

export default function PlanPage() {
  const plan = switzerlandPlan;

  const grand = plan.days.reduce(
    (acc, d) => {
      const t = dayTotals(d);
      return { cost: acc.cost + t.cost, km: acc.km + t.km, driveMin: acc.driveMin + t.driveMin };
    },
    { cost: 0, km: 0, driveMin: 0 }
  );

  return (
    <main className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="hero-panel mb-6 flex flex-col gap-4 rounded-3xl p-5 md:p-8">
        <h1 className="font-display text-3xl italic font-medium leading-tight md:text-4xl">{plan.title}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{plan.subtitle}</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat icon={Wallet} label="Est. total (2 people)" value={`CHF ${grand.cost}`} />
          <Stat icon={Car} label="Driving" value={`${grand.km} km`} />
          <Stat icon={Clock} label="Drive time" value={formatDuration(grand.driveMin)} />
        </div>
        <nav className="flex flex-wrap gap-2">
          {plan.days.map((d, i) => (
            <a key={d.date} href={`#day-${i + 1}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Day {i + 1} · {format(parseDateOnly(d.date), "EEE d")}
            </a>
          ))}
        </nav>
      </div>

      <div className="mb-10 rounded-2xl border bg-card p-5">
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <Info className="h-4 w-4 text-primary" />
          Good to know
        </div>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          {plan.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-14">
        {plan.days.map((day, i) => (
          <DaySection key={day.date} day={day} index={i} />
        ))}
      </div>
    </main>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-card px-2 py-3" style={{ borderColor: "var(--hero-border)" }}>
      <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
      <div className="font-display text-lg font-medium">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function DaySection({ day, index }: { day: PlanDay; index: number }) {
  const totals = dayTotals(day);
  const first = day.stops[0];
  const last = day.stops[day.stops.length - 1];
  const middle = day.stops.slice(1, -1).map((s) => s.mapsQuery);
  const routeUrl = googleMapsDirectionsUrl(first.mapsQuery, last.mapsQuery, middle.slice(0, 9));

  return (
    <section id={`day-${index + 1}`} className="scroll-mt-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Day {index + 1} · {format(parseDateOnly(day.date), "EEEE, MMM d")}
        </p>
        <h2 className="font-display text-2xl italic font-medium leading-tight">{day.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{day.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="h-4 w-4 text-primary" /> ~CHF {totals.cost}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Car className="h-4 w-4 text-primary" /> {totals.km} km · {formatDuration(totals.driveMin)}
          </span>
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <Route className="h-4 w-4" /> Open full day route in Google Maps
          </a>
        </div>
      </div>

      <div className="relative space-y-6 pl-14 md:pl-16">
        <div className="absolute top-2 bottom-2 left-[27px] w-px bg-border md:left-[31px]" />
        {day.stops.map((stop, i) => (
          <StopCard key={`${stop.start}-${stop.title}`} stop={stop} prev={day.stops[i - 1]} />
        ))}
      </div>
    </section>
  );
}

function StopCard({ stop, prev }: { stop: PlanStop; prev?: PlanStop }) {
  const style = getCategoryStyle(stop.category);
  const Icon = style.icon;

  return (
    <div className="relative">
      <div
        className="absolute -left-14 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background md:-left-16 md:h-14 md:w-14"
        style={{ background: tintBg(style.tintVar) }}
      >
        <Icon className="h-5 w-5" style={{ color: tintInk(style.tintVar) }} />
      </div>

      {stop.drive && prev && (
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Car className="h-3.5 w-3.5" />
            {stop.drive.km} km · {formatDuration(stop.drive.min)} drive
          </span>
          <a
            href={googleMapsDirectionsUrl(prev.mapsQuery, stop.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Directions
          </a>
        </div>
      )}

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="font-semibold">{stop.title}</div>
          <span className="whitespace-nowrap text-sm font-semibold text-primary">
            {formatTime12h(stop.start)}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{stop.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span
            className="rounded-full px-2.5 py-1 font-semibold uppercase tracking-wide"
            style={{ background: tintBg(style.tintVar), color: tintInk(style.tintVar) }}
          >
            {style.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
            <Clock className="h-3 w-3" />
            {formatDuration(stop.durationMin)} · until {formatTime12h(endTime(stop))}
          </span>
          {stop.costChf !== null && (
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <Wallet className="h-3 w-3" />
              {stop.costChf === 0 ? "Free" : `~CHF ${stop.costChf}`}
            </span>
          )}
        </div>
        {stop.costNote && <p className="mt-2 text-xs text-muted-foreground">{stop.costNote}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={googleMapsPlaceUrl(stop.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <MapPin className="h-4 w-4" /> Google Maps
          </a>
          <a
            href={googleSearchUrl(stop.searchQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <Search className="h-4 w-4" /> Google Search
          </a>
        </div>
      </div>
    </div>
  );
}

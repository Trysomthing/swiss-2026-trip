// Parses a "YYYY-MM-DD" date-only string as a local calendar date, avoiding
// the UTC-midnight timezone shift that `new Date("YYYY-MM-DD")` introduces.
export function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Formats a "HH:MM" 24-hour time string as "2:30 PM".
export function formatTime12h(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minuteStr} ${period}`;
}

export type TimeOfDayBucket = "morning" | "afternoon" | "evening" | "anytime";

export function bucketForTime(time: string | null): TimeOfDayBucket {
  if (!time) return "anytime";
  const hour = Number(time.split(":")[0]);
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
